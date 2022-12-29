# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Used following website to get started: https://medium.com/coinmonks/build-a-web-3-application-with-solidity-hardhat-react-and-web3js-61b7ff137885

To Build:
1. start a terminal and change to crowd_source_project folder
2. in that terminal run: npx hardhat node 
Note: that will create a bunch of user accounts for etherium with 1000Ether
3. in another terminal, change directy to crowd_source_project
4. in that terminal run: npx hardhat run scripts/deploy.ts --network localhost.
Note: that will deploy the lock contract and there is a log which will give you the lock contract address.
5. in the utils/constants.js copy the lock contract address.
6. in another terminal, change directory to crowd_source_project/my-project
7. in that terminal, run: npm start
Note: that will run the react App.js script

