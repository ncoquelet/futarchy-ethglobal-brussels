"use client";
import Link from 'next/link'
import Image from 'next/image'
import ProposalCard from '../components/ProposalCard';
import React, { useState } from 'react';
import { ethers } from 'ethers'
import { abi } from '../abi/FutarchyGovernance.json';
import { ALCHEMY_KEY, WALLETCONNECT_KEY, GOVERNANCE_CONTRACT_ADDRESS, GOVERNANCE_CONTRACT_ABI, GOAL_CONTRACT_ABI } from './config';

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {

  const provider = new ethers.AlchemyProvider("mainnet", ALCHEMY_KEY);
  //const futarchyGovernanceContract = new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, abi, provider);
  //get the goalsAddress
  //const goalsLength = await futarchyGovernanceContract.goals.length;
  
  //const goalsAddress[] : Array<String>;
  //for (let i = 0; i < goalsLength; i++) {
  //  goalsAddress.push(await futarchyGovernanceContract.goals(i));
  //}

  interface Goal {
    description: string;
    votingDeadline: number;
    proposals: string[];
    currentProposal: number;
    goalMaturity: number;
    goalValue: number;
  }

  //const [goals, setGoals] = useState<Goal[]>([]);

  //get the goals from address
  const goals = [
    {address: 'address1', title:'goal1', state: 'trading period', votingDeadLine: '200000', owner: 'owner1', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]},
    {address: 'address2', title:'goal2', state: 'trading period', votingDeadLine: '200000', owner: 'owner2', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]},
    {address: 'address3', id: 'id3', title:'goal3', state: 'trading period', votingDeadLine: '200000', owner: 'owner1', proposals: [{title: 'proposal 1 title'}, {title: 'proposal 2 title'}, {title: 'proposal 3 title'}]}
  ];
  //const fetchGoals = async () => {
  //  const goalPromises = goalsAddress.map(async (address) => {
  //    const futarchyGoalContract = new ethers.Contract(address, GOAL_CONTRACT_ABI, provider)  
  //    const proposalsLength = await futarchyGoalContract.proposals.length;
  //    const proposals = [];
  //    for (let i = 0; i < proposalsLength; i++) {
  //      proposals.push(await futarchyGoalContract.proposals(i));
  //    }
  //    const currentProposal = await futarchyGoalContract.currentProposal();
  //    const description = await futarchyGoalContract.description();
  //    const goalMaturity = await futarchyGoalContract.goalMaturity();
  //    const goalValue = await futarchyGoalContract.goalValue();
  //    const votingDeadline = await futarchyGoalContract.votingDeadline();
  //    return {
  //      description,
  //      votingDeadline,
  //      proposals,
  //      currentProposal,
  //      goalMaturity,
  //      goalValue
  //    };
  //  })  
  //  const goalsData = await Promise.all(goalPromises);
  //  setGoals(goalsData);
  //};
//
  //fetchGoals();

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
        <div style={{flex: '0 0 30%'}}>
          <div>
            <div className="hero-text font-satoshi text-4xl font-bold mb-4" style={{marginTop:'1rem'}}>
              Chose a goal and reach it with community 
            </div>
          </div>
          <div>
            <Button bg='white' color='customBlue.100' size='md'>
            <Link href='/goal-create'>
              New goal
            </Link>
            </Button>
          </div>
        </div>
        <div style={{display: 'flex', flex: '0 0 50%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Image
              src="/sunset.png"
              width={350}
              height={350}
              alt="Picture of a sunset"
            />
          </div>
        </div>
      </div>
      <div className="section" style={{marginBottom:'2rem'}}>
        <h1 style={{marginTop:'1rem'}}>New goals</h1>
        <div className="card-list">
          {cardList}
        </div>
      </div>
    </main>
  );
}
