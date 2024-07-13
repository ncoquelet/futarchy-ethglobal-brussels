"use client";
import Link from 'next/link'
import Image from 'next/image'
import ProposalCard from '../components/ProposalCard';

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
  const proposals = [
    "{Proposal title Proposal title Proposal title Proposal title }",
    "{Proposal title Proposal title Proposal title Proposal title }",
    "{Proposal title Proposal title Proposal title Proposal title }"
  ];
  return (
    <main>
      <div className="hero">
        <div>
          <div>
            <h1 className="hero-text">
              Drop your goal and test it with community 
            </h1>
          </div>
          <div>
            <Button colorScheme='blue' size='sm'>Test your goal</Button>
          </div>
        </div>
        
      </div>
      <h1>List of goals</h1>
      <Link href="/goal-overview">
          <ProposalCard
            title="Title Title Title Title Title Title Title Title Title Title Title ?"
            tradingPeriod="05.07.2024 ~ 05.08.2024"
            proposals={proposals}
          />
      </Link>
      <h2><Link href="/goal-overview">goal 1</Link></h2>
      <h2><Link href="/goal-overview">goal 2</Link></h2>
      <h2><Link href="/goal-overview">goal 3</Link></h2>
    </main>
  );
}
