#!/bin/sh

yarn hardhat --network cypress setup \
  --owner  0x45129A8fe7Dee4e6E16E738be673984DA684371F \
  --avatar 0x204F823Da41B8E6eb29B1d1A99aC2E349DcE3079 \
  --target 0x204F823Da41B8E6eb29B1d1A99aC2E349DcE3079 \
  --oracle 0xEBA3B931d7a7177d5adC64Dff3A60232FdE184Db \
  --template 0x0000000000000000000000000000000000000000000000000000000000000005 \
  --iserc20 true \
  --timeout 3600 \
  --cooldown 3600; # for one hour

# Using the account: 0x45129A8fe7Dee4e6E16E738be673984DA684371F
# Module deployed to: 0xAf53d60C0e2500BBA894d0c9635FB9bbcd064432
