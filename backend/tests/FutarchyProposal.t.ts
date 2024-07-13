// We import Chai to use its asserting functions here.
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Futarchy Proposal', () => {
  async function deployGovernance() {
    // Get the ContractFactory and Signers here.
    const FutarchyProposal = await ethers.getContractFactory('FutarchyProposal')
    const [owner, parentContract, alice] = await ethers.getSigners()

    const proposal = await ethers.deployContract('FutarchyProposal', [
      parentContract.address,
      'description',
    ])

    return { FutarchyProposal, proposal, owner, parentContract, alice }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { proposal, parentContract } = await loadFixture(deployGovernance)
      expect(await proposal.owner()).to.equal(parentContract.address)
      expect(await proposal.description()).to.equal('description')
    })
  })

  describe('Buy', () => {
    it('should add Yes balance', async () => {
      const { proposal, parentContract } = await loadFixture(deployGovernance)
      await proposal.buyYes({ value: ethers.parseUnits('1', 'gwei') })
      expect(await proposal.balanceYes()).to.be.equal(
        ethers.parseUnits('1', 'gwei')
      )
      expect(await proposal.balanceNo()).to.be.equal(0)
    })
    it('should add No balance', async () => {
      const { proposal, parentContract } = await loadFixture(deployGovernance)
      await proposal.buyNo({ value: ethers.parseUnits('1', 'gwei') })
      expect(await proposal.balanceNo()).to.be.equal(
        ethers.parseUnits('1', 'gwei')
      )
      expect(await proposal.balanceYes()).to.be.equal(0)
    })
  })
})
