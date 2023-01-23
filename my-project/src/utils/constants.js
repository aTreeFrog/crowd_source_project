import Lock from './Lock.json';

export const contractAbi = Lock.abi;

// obtained this by first in the hardhat area under scripts/deploy.ts 
// I ran that script which has a log of the lock sol address
// to run that script use: npx hardhat run scripts/deploy.ts --network localhost
//export const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
export const contractAddress = '0x94c2780D505f135842eAa73aee5c3292212c8C2B';
//export const contractAddress = '0xA5efe689d31F138C2581aee8Ea78319E1fc6EBAc';
