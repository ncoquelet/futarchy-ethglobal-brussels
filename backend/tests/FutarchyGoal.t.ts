// We import Chai to use its asserting functions here.
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Futarchy Goal', () => {
  async function deployGoal() {
    // Get the ContractFactory and Signers here.
    const FutarchyGoal = await ethers.getContractFactory(
      'FutarchyGoal'
    )
    const [owner, alice] = await ethers.getSigners()

    const goal = await FutarchyGoal.deploy('desc', owner, 1000, 20)

    return { FutarchyGoal, goal, owner, alice }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { goal, owner } = await loadFixture(deployGoal)
      expect(await goal.owner()).to.equal(owner.address)
    })
    it('constructor of goal should set attributes properly', async () => {
        const { goal } = await loadFixture(deployGoal)
        expect(await goal.description()).to.equal('desc')
        expect(await goal.goalMaturity()).to.equal(1000)
        expect(await goal.goalValue()).to.equal(20)
    })
  })

  describe('Add Proposal', () => {
    it('should add new proposal', async () => {
      const { goal, owner } = await loadFixture(deployGoal)

      const expectedDesc = 'desc'

      await expect(goal.createProposal(expectedDesc)).to.emit(
        goal,
        'ProposalAdded'
      )
    })

    it('should revert if sender is not the owner', async () => {
      const { goal, alice } = await loadFixture(deployGoal)
      await expect(
        goal.connect(alice).createProposal('desc')
      ).to.be.revertedWithCustomError(goal, 'OwnableUnauthorizedAccount')
    })
  })
})
