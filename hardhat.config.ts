import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: __dirname + '/.env' })
const alc_key = process.env.REACT_APP_ALCHEMY_KEY
const act_private_key = process.env.PRIVATE_WALLET_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

export default config;

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: alc_key,
      accounts: [act_private_key]
    }
  },
  solidity: "0.8.9",
}
