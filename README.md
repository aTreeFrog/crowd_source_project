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

Tips:
- after you compile your solidity file. You must copy the Lock.json file from the contracts/Lock.sol folder and paste it in the my-project/src/utils/Lock.Json file there in order to update.

To Build:
1. start a terminal and change to crowd_source_project folder
2. in that terminal run: npx hardhat node 
Note: that will create a bunch of user accounts for etherium with 1000Ether
Note: It might at the bottom give you the contract address. If so, skip to step 5 with that value.
3. in another terminal, change directy to crowd_source_project
4. in that terminal run: npx hardhat run scripts/deploy.ts --network localhost.
Note: that will deploy the lock contract and there is a log which will give you the lock contract address.
5. in the utils/constants.js copy the lock contract address.
6. in another terminal, change directory to crowd_source_project/my-project
7. in that terminal, run: npm start
Note: that will run the react App.js script

TESTING SANDBOX
1. Need to make .env file work. in my-project folder, run: npm install dotenv --save  

2. need to make alchemy wrapper work (which is wrapper to web3 for connecting to smart contracts. Look at interact.js and this link for more info: https://docs.alchemy.com/docs/how-to-create-an-nft).  run: npm install @alch/alchemy-web3


