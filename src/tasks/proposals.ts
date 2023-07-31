import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { task, types } from "hardhat/config";
import { readFileSync } from "fs";
import IRealityETH_ERC20ABI from "./IRealityETH_ERC20.abi.json";
import ERC20ABI from "./ERC20.abi.json";

interface Proposal {
    id: string,
    txs: ModuleTransaction[]
}

interface ExtendedProposal extends Proposal {
    txsHashes: string[]
}

interface ModuleTransaction {
    to: string,
    value: string,
    data: string,
    operation: number,
    nonce: number
}

const getProposalDetails = async (module: Contract, path: string): Promise<ExtendedProposal> => {
    const proposal: Proposal = JSON.parse(readFileSync(path, "utf-8"))
    const txsHashes = await Promise.all(proposal.txs.map(async (tx, index) => {
        return await module.getTransactionHash(tx.to, tx.value, tx.data, tx.operation, index)
    }));
    return {
        ...proposal,
        txsHashes
    }
}

task("addProposal", "Adds a proposal question")
        .addParam("module", "Address of the module", undefined, types.string)
        .addParam("proposalFile", "File with proposal information json", undefined, types.inputFile)
        .setAction(async (taskArgs, hardhatRuntime) => {
            const ethers = hardhatRuntime.ethers;
            const module = await ethers.getContractAt("RealityModule", taskArgs.module);

            const proposal = await getProposalDetails(module, taskArgs.proposalFile);

            const tx = await module.addProposal(proposal.id, proposal.txsHashes);
            console.log("Transaction:", tx.hash);
        });

task("showProposal", "Shows proposal question details")
        .addParam("module", "Address of the module", undefined, types.string)
        .addParam("proposalFile", "File with proposal information json", undefined, types.inputFile)
        .setAction(async (taskArgs, hardhatRuntime) => {
            const ethers = hardhatRuntime.ethers;
            const module = await ethers.getContractAt("RealityModule", taskArgs.module);

            const proposal = await getProposalDetails(module, taskArgs.proposalFile);

            const txHashesImages = ethers.utils.solidityPack(["bytes32[]"], [proposal.txsHashes])
            const txHashesHash = ethers.utils.keccak256(txHashesImages)

            console.log("### Proposal ####");
            console.log("ID:", proposal.id);
            console.log("Transactions hashes hash:", txHashesHash);
            console.log("Transactions hashes:", proposal.txsHashes);
            console.log("Transactions:", proposal.txs);
        });

task("executeProposal", "Executes a proposal")
        .addParam("module", "Address of the module", undefined, types.string)
        .addParam("proposalFile", "File with proposal information json", undefined, types.inputFile)
        .setAction(async (taskArgs, hardhatRuntime) => {
            const ethers = hardhatRuntime.ethers;
            const module = await ethers.getContractAt("RealityModule", taskArgs.module);

            const proposal = await getProposalDetails(module, taskArgs.proposalFile);

            for (const index in proposal.txs) {
                const moduleTx = proposal.txs[index]
                const tx = await module.executeProposalWithIndex(
                    proposal.id, proposal.txsHashes, moduleTx.to, moduleTx.value, moduleTx.data, moduleTx.operation, index
                );
                console.log("Transaction:", tx.hash);
            }
        });

task("submitAnswer", "submit answer")
  .addParam("module", "Address of the module", undefined, types.string)
  .addParam("questionId", "questionId", undefined, types.string)
  // .addParam("proposalFile", "File with proposal information json", undefined, types.inputFile)
  .setAction(async (taskArgs, hardhatRuntime) => {
    const ethers = hardhatRuntime.ethers;
    const amount = 10n ** 18n;
    const answer = "0x0000000000000000000000000000000000000000000000000000000000000001"

    const module = await ethers.getContractAt("RealityModule", taskArgs.module);
    const oracleAddress = await module.oracle();
    const oracle = await ethers.getContractAt(IRealityETH_ERC20ABI, oracleAddress);

    const tokenAddress = await oracle.token();
    const tokenContract = await ethers.getContractAt(ERC20ABI, tokenAddress);
    await tokenContract.approve(oracleAddress, amount);

    await oracle.submitAnswerERC20(
      taskArgs.questionId,
      answer,
      amount,
      amount,
    );
  });

export { };