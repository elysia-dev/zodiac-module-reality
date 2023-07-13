#!/bin/sh

yarn hardhat --network baobab verifyEtherscan \
  --module 0x32011890F14c5888EA2DC3BFC79e4b807d578243 \
  --owner  0x189027e3C77b3a92fd01bF7CC4E6a86E77F5034E \
  --avatar 0x54C50fd7AA6ba75faeBF951ec72bb3D1Cc6efDae \
  --target 0x54C50fd7AA6ba75faeBF951ec72bb3D1Cc6efDae \
  --oracle 0x9Ac19Fa6c5f124B6D42fF1e0FdACf0e776AA9624 \
  --template 0x0000000000000000000000000000000000000000000000000000000000000005 \
  --timeout 3600 \
  --cooldown 3600
