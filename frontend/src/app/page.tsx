"use client";
import Link from 'next/link'
import Image from 'next/image'
import ProposalCard from '../components/ProposalCard';
import { ethers } from 'ethers'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {

  // const FutarchyGovernance = await ethers.getContractFactory(
  //   'FutarchyGovernance'
  // )

  //get the goalsAddress
  const goalsAddress = ['address1', 'address2', 'address3']

  //get the goals from address
  const goals = [
    {address: 'address1', title:'goal1', state: 'trading period', votingDeadLine: '200000', owner: 'owner1', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]},
    {address: 'address2', title:'goal2', state: 'trading period', votingDeadLine: '200000', owner: 'owner2', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]},
    {address: 'address3', id: 'id3', title:'goal3', state: 'trading period', votingDeadLine: '200000', owner: 'owner1', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]}
  ];

  const cardList = goals.map(goal => 
  <div className="card-container" key={goal.address}>    
    <Link href={{
      pathname: '/goal-overview',
      query: { goalAddress: goal.address } // the data
    }}>
      <ProposalCard
        goal={goal}
        votingDeadline={goal.votingDeadLine}
        proposals={
          goal.proposals
        }
      />
    </Link>
  </div>
  );



  return (

    <main className="p-4 font-satoshi">
      <div className="hero" style={{ display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div>
            <div className="hero-text font-satoshi text-4xl font-bold mb-4">
              Drop your goal and test it with community 
            </div>
          </div>
          <div>
            <Button colorScheme='blue' size='sm'>
            <Link href='/goal-create'>
              Test your goal
            </Link>
            </Button>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
        <Image
          src="/sunset.png"
          width={300}
          height={300}
          alt="Picture of a sunset"
        />
        </div>
      </div>
      <div className="section">
        <h1>New goals</h1>
        <div className="card-list">
          {cardList}
        </div>
      </div>
    </main>
  );
}
