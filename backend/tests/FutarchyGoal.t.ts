// We import Chai to use its asserting functions here.
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Futarchy Goal', () => {
  async function deployGoal() {
    // Get the ContractFactory and Signers here.
    const FutarchyGoal = await ethers.getContractFactory('FutarchyGoal')
    const [owner, alice] = await ethers.getSigners()

    const goal = await FutarchyGoal.deploy(
      'desc',
      'proposal',
      owner,
      1000,
      20,
      100,
      false
    )

    return { FutarchyGoal, goal, owner, alice }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { goal, owner } = await loadFixture(deployGoal)
      expect(await goal.owner()).to.equal(owner.address)
    })
    it('constructor of goal should set attributes properly', async () => {
      const { goal } = await loadFixture(deployGoal)
      expect(await goal.remoteCid()).to.equal('desc')
      expect(await goal.goalMaturity()).to.equal(1000)
      expect(await goal.goalValue()).to.equal(20)
      expect(await goal.votingDeadline()).to.equal(100)
    })
  })

  describe.skip('Add Proposal', () => {
    it('should add new proposal', async () => {
      const { goal, owner } = await loadFixture(deployGoal)

      const expectedDesc = 'desc'

      /* await expect(goal.createProposal(expectedDesc)).to.emit(
        goal,
        'ProposalAdded'
      )*/
    })

    it.skip('should revert if sender is not the owner', async () => {
      const { goal, alice } = await loadFixture(deployGoal)
      // await expect(
      //   goal.connect(alice).createProposal('desc')
      // ).to.be.revertedWithCustomError(goal, 'OwnableUnauthorizedAccount')
    })
  })

  describe.skip('Cancel Proposal', () => {
    it('should revert cancel a proposal if deadline is not reached', async () => {
      const { goal, owner } = await loadFixture(deployGoal)

      // await goal.connect(owner).createProposal('desc')
      // await expect(goal.connect(owner).endProposalVoting()).to.be.revertedWith(
      //   'Time is not over'
      // )
    })

    it('should cancel a proposal if deadline is reached', async () => {
      const { goal, owner } = await loadFixture(deployGoal)

      // await goal.connect(owner).createProposal('desc')
      // await goal.connect(owner).createProposal('desc2')

      const initialProposal = await goal.currentProposal()

      // Augmenter le temps
      await ethers.provider.send('evm_increaseTime', [150])

      // Mine un nouveau bloc pour appliquer le changement de temps
      await ethers.provider.send('evm_mine', [])
      await goal.connect(owner).endProposalVoting()

      expect(await goal.currentProposal()).to.equal(initialProposal + BigInt(1))
    })
  })
})
