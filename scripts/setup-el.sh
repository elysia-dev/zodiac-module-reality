#!/bin/sh

yarn hardhat --network cypress setup \
  --owner  0x45129A8fe7Dee4e6E16E738be673984DA684371F \
  --avatar 0x204F823Da41B8E6eb29B1d1A99aC2E349DcE3079 \
  --target 0x204F823Da41B8E6eb29B1d1A99aC2E349DcE3079 \
  --oracle 0x9Ac19Fa6c5f124B6D42fF1e0FdACf0e776AA9624 \
  --template 0x0000000000000000000000000000000000000000000000000000000000000005 \
  --iserc20 true \
  --timeout 3600 \
  --cooldown 3600; # for one hour
