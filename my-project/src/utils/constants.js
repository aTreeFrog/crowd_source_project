import Lock from './Lock.json';

export const contractAbi = Lock.abi;

// obtained this by first in the hardhat area under scripts/deploy.ts 
// I ran that script which has a log of the lock sol address
// to run that script use: npx hardhat run scripts/deploy.ts --network localhost
export const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

