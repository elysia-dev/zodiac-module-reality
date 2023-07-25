#!/bin/sh

yarn hardhat --network cypress setup \
  --owner  0x45129A8fe7Dee4e6E16E738be673984DA684371F \
  --avatar 0xf112bE61035421Ac6B2Bc19d54235352fc411553 \
  --target 0xf112bE61035421Ac6B2Bc19d54235352fc411553 \
  --oracle 0xC0ab7a7403767F5b6EaDf4a1a57225ef6787F819 \
  --template 0x0000000000000000000000000000000000000000000000000000000000000005 \
  --iserc20 true \
  --timeout 3600 \
  --cooldown 3600; # for one hour

# Using the account: 0x45129A8fe7Dee4e6E16E738be673984DA684371F
# Module deployed to: 0x063e6c98205b94abB7A303edd3FEd42CEC5B68Cd