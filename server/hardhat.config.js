require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: ALCHEMY_API_KEY_URL,
      chainID: 80001,
      accounts: [MUMBAI_PRIVATE_KEY],
    }
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};