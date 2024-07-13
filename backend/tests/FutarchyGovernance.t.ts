// We import Chai to use its asserting functions here.
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Futarchy Governance', () => {
  async function deployGovernance() {
    // Get the ContractFactory and Signers here.
    const FutarchyGovernance = await ethers.getContractFactory(
      'FutarchyGovernance'
    )
    const [owner] = await ethers.getSigners()

    const governance = await FutarchyGovernance.deploy()

    return { FutarchyGovernance, governance, owner }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { governance, owner } = await loadFixture(deployGovernance)
      expect(await governance.owner()).to.equal(owner.address)
    })
  })

  describe('Add Proposal', () => {
    it('should add new proposal', async () => {
      const { governance, owner } = await loadFixture(deployGovernance)

      // when
      const expectedDesc = 'desc'
      const expectedDuration = 14

      await expect(
        governance.createProposal(expectedDesc, expectedDuration)
      ).to.emit(governance, 'ProposalAdded')
    })

    it('should revert if sender is not the owner', async () => {
      const { governance, owner } = await loadFixture(deployGovernance)
      await expect(governance.createProposal('desc', 14)).to.be.reverted()
    })
  })
})
