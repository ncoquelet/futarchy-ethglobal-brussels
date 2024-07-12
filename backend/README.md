# Futarchy ETHGlobal Brussels

## Install

1. Clone this repo by running `git clone https://github.com/ncoquelet/futarchy-ethglobal-brussels`
2. `cd futarchy-ethglobal-brussels/backend`
3. `npm install`
4. Run `npx hardhat compile` to test installation

## Tests

Run `npx hardhat test` to execute test suite

## Start a local node

run `npx hardhat node`

## Deployement scripts

### Localhost

run `npx hardhat run scripts/deploy.ts --network localhost` to deploy the contract manually

### Sepolia

run `HARDHAT_ENV=production npx hardhat run scripts/deploy.ts --network sepolia` to deploy the contract manually

## Simulation