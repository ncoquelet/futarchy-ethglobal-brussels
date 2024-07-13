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
    const [owner, alice] = await ethers.getSigners()

    const governance = await FutarchyGovernance.deploy()

    return { FutarchyGovernance, governance, owner, alice }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { governance, owner } = await loadFixture(deployGovernance)
      expect(await governance.owner()).to.equal(owner.address)
    })
  })

  describe('Add Goal', () => {
    it('should add new goal', async () => {
      const { governance, owner } = await loadFixture(deployGovernance)

      // when
      const expectedDesc = 'desc'

      await expect(governance.createGoal(expectedDesc, BigInt(10), BigInt(20))).to.emit(
        governance,
        'GoalAdded'
      )
    })

    it('should revert if sender is not the owner', async () => {
      const { governance, alice } = await loadFixture(deployGovernance)
      await expect(
        governance.connect(alice).createGoal('desc', BigInt(10), BigInt(20))
      ).to.be.revertedWithCustomError(governance, 'OwnableUnauthorizedAccount')
    })
  })
})
