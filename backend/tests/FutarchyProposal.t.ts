// We import Chai to use its asserting functions here.
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Futarchy Proposal', () => {
  async function deployProposal() {
    // Get the ContractFactory and Signers here.
    const FutarchyProposal = await ethers.getContractFactory('FutarchyProposal')
    const [owner, parentContract, alice, oracle] = await ethers.getSigners()

    const proposal = await ethers.deployContract('FutarchyProposal', [
      parentContract.address,
      'description',
      oracle.address,
    ])

    return { FutarchyProposal, proposal, owner, parentContract, alice, oracle }
  }

  describe('Deployment', () => {
    it('should set the owner', async () => {
      const { proposal, parentContract, oracle } = await loadFixture(deployProposal)
      expect(await proposal.owner()).to.equal(parentContract.address)
      expect(await proposal.description()).to.equal('description')
      expect(await proposal.oracle()).to.equal(oracle.address)
    })
  })

  describe('Buy', () => {
    it('should add Yes balance', async () => {
      const { proposal, alice } = await loadFixture(deployProposal)
      await proposal
        .connect(alice)
        .buyYes({ value: ethers.parseUnits('1', 'gwei') })
      expect(await proposal.connect(alice).balanceYes()).to.be.equal(
        ethers.parseUnits('1', 'gwei')
      )
      expect(
        await proposal.connect(alice).mappingYes(alice.address)
      ).to.be.equal(ethers.parseUnits('1', 'gwei'))
      expect(await proposal.connect(alice).balanceNo()).to.be.equal(0)
      expect(
        await proposal.connect(alice).mappingNo(alice.address)
      ).to.be.equal(0)
    })

    it('should add No balance', async () => {
      const { proposal, alice } = await loadFixture(deployProposal)
      await proposal
        .connect(alice)
        .buyNo({ value: ethers.parseUnits('1', 'gwei') })
      expect(await proposal.connect(alice).balanceNo()).to.be.equal(
        ethers.parseUnits('1', 'gwei')
      )
      expect(
        await proposal.connect(alice).mappingNo(alice.address)
      ).to.be.equal(ethers.parseUnits('1', 'gwei'))
      expect(await proposal.connect(alice).balanceYes()).to.be.equal(0)
      expect(
        await proposal.connect(alice).mappingYes(alice.address)
      ).to.be.equal(0)
    })
  })

  describe('Close', () => {
    it('should close proposal', async () => {
      const { proposal, parentContract } = await loadFixture(deployProposal)

      await expect(proposal.connect(parentContract).tallyGoal(true)).to.be.emit(proposal, 'ProposalClosed')
    })
    it('should revert close proposal if not owner', async () => {
      const { proposal, parentContract, alice } = await loadFixture(deployProposal)

      await expect(proposal.connect(alice).tallyGoal(true)).to.be.revertedWithCustomError(
        proposal,
        'OwnableUnauthorizedAccount'
      )
    })
    it('should revert buyYes when proposal is closed', async () => {
      const { proposal, parentContract, alice } = await loadFixture(
        deployProposal
      )
      await proposal.connect(parentContract).tallyGoal(true)
      await expect(
        proposal
          .connect(alice)
          .buyYes({ value: ethers.parseUnits('1', 'gwei') })
      ).to.be.revertedWithoutReason()
    })
    it('should revert buyNo when proposal is closed', async () => {
      const { proposal, parentContract, alice } = await loadFixture(
        deployProposal
      )
      await proposal.connect(parentContract).tallyGoal(true)
      await expect(
        proposal.connect(alice).buyNo({ value: ethers.parseUnits('1', 'gwei') })
      ).to.be.revertedWithoutReason()
    })
  })

  describe('Cancel', () => {
    it('should revert cancel proposal if not owner', async () => {
      const { proposal, parentContract } = await loadFixture(deployProposal)

      await expect(proposal.cancel()).to.be.revertedWithCustomError(
        proposal,
        'OwnableUnauthorizedAccount'
      )
    })

    it('should cancel proposal', async () => {
      const { proposal, parentContract } = await loadFixture(deployProposal)

      await expect(proposal.connect(parentContract).cancel()).to.be.emit(
        proposal,
        'ProposalCanceled'
      )
    })

    it('should revert buyYes when proposal is canceled', async () => {
      const { proposal, parentContract, alice } = await loadFixture(
        deployProposal
      )
      await proposal.connect(parentContract).cancel()
      await expect(
        proposal
          .connect(alice)
          .buyYes({ value: ethers.parseUnits('1', 'gwei') })
      ).to.be.revertedWithoutReason()
    })
    it('should revert buyNo when proposal is canceled', async () => {
      const { proposal, parentContract, alice } = await loadFixture(
        deployProposal
      )
      await proposal.connect(parentContract).cancel()
      await expect(
        proposal.connect(alice).buyNo({ value: ethers.parseUnits('1', 'gwei') })
      ).to.be.revertedWithoutReason()
    })
  })

  describe('Withdraw', () => {
    it('should withdraw all my deposit if ', () => {})
  })
})
