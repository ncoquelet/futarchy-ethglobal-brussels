import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-verify'
import { HardhatUserConfig } from 'hardhat/config'

const { ACCOUNT0, ALCHEMY_SEPOLIA_RPC_URL, ALCHEMY_KEY, ETHERSCAN_API_KEY } =
  process.env

const networks: any = {}
if (process.env.HARDHAT_ENV === 'production') {
  networks['sepolia'] = {
    url: ALCHEMY_SEPOLIA_RPC_URL,
    chainId: 11155111,
    accounts: [ACCOUNT0 as string],
  }
  networks['kakarot'] = {
    url: 'https://sepolia-rpc.kakarot.org',
    chainId: 1802203764,
    accounts: [ACCOUNT0 as string],
  }
}

const config: HardhatUserConfig = {
  paths: {
    tests: './tests',
  },

  networks: networks,

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  solidity: {
    version: '0.8.26',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}

export default config
