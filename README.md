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

also had to ensure I ran: npx hardhat compile  to generate the abi.json

I had to copy the abi data which got put in the artifacts directory.

I followed here: https://hardhat.org/hardhat-runner/docs/guides/compile-contracts

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

and run: npm install dotenv-webpack --save-dev

2. need to make alchemy wrapper work (which is wrapper to web3 for connecting to smart contracts. Look at interact.js and this link for more info: https://docs.alchemy.com/docs/how-to-create-an-nft).  

run: npm install @alch/alchemy-web3

3. had to install assert. run: npm install assert

4. ran this: npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process

basically followed this webstite to fix webpack issue with alchemy. https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5

5.ToDo: for the nft contracts. run this to get the nft contracts you can import: npm install @openzeppelin/contracts

6. actually had to remove these lins in my react code.

require('dotenv').config();

react already has that built in and adding this messes things up. So I commented it out everywhere. 

Also, got to make sure all environmental variables start with REACT_APP_  otherwise js won't work properly. 

7. for the contract side, have to get hardhat to run on the goerli network. I updated the hardhat.config.ts file to support goerli.  and used a .env file that contained the needed info. 

I also had to run: npm install --save @types/node  

this helps get .env to work.

trying to make this command work: npx hardhat run scripts/deploy.ts --network goerli

this gets the contracts running in the goerli network (using the deploy.ts that came with hardhat). Then we can call this contract with npm start.

this helped me setup hardhat config for goerli: https://hardhat.org/hardhat-runner/docs/config

remember to add funds to your accunt from this website: https://goerlifaucet.com/


8. setting gas price in the hardhat config so metamask can know what it will be in your contract. 

followed this site for tips: https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04


DON'T FORGET TO UPDATE THE LOCK.JSON file anytime you make changes to a soldity contract. 


9. REACT NAVBAR work

using this website to learn and get started: https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

from that website instructions, had to also run: npm install react-icons --save

and in app.js, had to use element= instead of component= since component no longer works. https://stackoverflow.com/questions/69854011/matched-leaf-route-at-location-does-not-have-an-element

also, had to wrap the function with <const/>  like shown below:
//<Route path='/about' element={<About />} />//

10. Search bar
also adding search bar by following this github account: https://github.com/machadop1407/React-Search-Bar 

and website: https://www.youtube.com/watch?v=x7niho285qs

in order to get some search icons to work had to download a couple packages but they had issues so had to first run the following:

npm config set legacy-peer-deps true
npm i