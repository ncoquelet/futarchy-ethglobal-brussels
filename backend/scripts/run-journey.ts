import dayjs, { ManipulateType } from 'dayjs'
import daygoalAddrjs from 'dayjs'
import { ethers } from 'hardhat'

const fakeTime = async (value: number, unit: ManipulateType) => {
  // Augmenter le temps
  await ethers.provider.send('evm_increaseTime', [
    dayjs().add(value, unit).add(1, 'day').unix(),
  ])

  // Mine un nouveau bloc pour appliquer le changement de temps
  await ethers.provider.send('evm_mine', [])
}

async function main() {
  const governance = await ethers.deployContract('FutarchyGovernance')
  await governance.waitForDeployment()
  console.log('Deployed new FutarchETH contract', await governance.getAddress())

  const [owner, bob, alice, tony] = await ethers.getSigners()

  const desc = 'Reduce greenhouse gas emissions by 20% within two years'
  const goalMaturityDate = dayjs().add(2, 'year').unix()
  const currentValue = 2000
  const goalValue = currentValue * 0.8

  const tx = await governance.createGoal(
    desc,
    goalMaturityDate,
    goalValue,
    BigInt(60 * 60 * 24 * 14),
    true
  )
  tx.wait()

  const addedGoalFilter = governance.filters.GoalAdded()
  const goalAddr = (await governance.queryFilter(addedGoalFilter))[0]
  console.log('Created a new goal', goalAddr.args._addr)

  const goal = await ethers.getContractAt('FutarchyGoal', goalAddr.args._addr)

  const re = await goal.createProposal('More bicycle lanes')
  re.wait()
  const re2 = await goal.createProposal(
    "50% renewable energy in the city's energy consumption"
  )
  re2.wait()
  const r3 = await goal.createProposal('New line Bus')
  r3.wait()

  const addedProposalFilter = goal.filters.ProposalAdded()
  const proposalAddresses = await goal.queryFilter(addedProposalFilter)

  console.log('proposition addresses')
  proposalAddresses.forEach((addr) => {
    console.log('- ', addr.args._proposalAddr)
  })

  const proposition1 = await ethers.getContractAt(
    'FutarchyProposal',
    proposalAddresses[0].args._proposalAddr
  )

  console.log('Proposition 1', await proposition1.getAddress())

  await proposition1.connect(bob).buyYes({ value: ethers.parseEther('40') })
  await proposition1.connect(alice).buyNo({ value: ethers.parseEther('20') })
  await proposition1.connect(tony).buyNo({ value: ethers.parseEther('30') })
  console.log('vote : bob 40, alice 20, tony 30')

  fakeTime(2, 'week')
  await goal.endProposalVoting()

  const proposition2 = await ethers.getContractAt(
    'FutarchyProposal',
    proposalAddresses[1].args._proposalAddr
  )

  console.log('Proposition 2', await proposition2.getAddress())

  await proposition2.connect(bob).buyNo({ value: ethers.parseEther('40') })
  await proposition2.connect(alice).buyYes({ value: ethers.parseEther('90') })
  await proposition2.connect(tony).buyNo({ value: ethers.parseEther('30') })
  console.log('vote : bob 40, alice 90, tony 30')

  fakeTime(2, 'week')
  await goal.endProposalVoting()

  const proposition3 = await ethers.getContractAt(
    'FutarchyProposal',
    proposalAddresses[2].args._proposalAddr
  )

  try {
    console.log('Proposition 3', await proposition3.getAddress())

    await proposition3.connect(bob).buyYes({ value: ethers.parseEther('40') })
    await proposition3.connect(alice).buyNo({ value: ethers.parseEther('90') })
    await proposition3.connect(tony).buyYes({ value: ethers.parseEther('30') })
    console.log('vote : bob 40, alice 90, tony 30')
  } catch (err) {
    console.log('nice catch')
  }

  try {
    await goal.endProposalVoting()
  } catch (err) {
    console.log('nice catch bis')
  }

  await goal.goalAchieved()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
