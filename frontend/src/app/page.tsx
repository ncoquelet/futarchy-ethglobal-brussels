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
          <div className="card-container">
            <Link href="/goal-overview">
              <ProposalCard
                title="Title Title Title Title Title Title Title Title Title Title Title ?"
                tradingPeriod="05.07.2024 ~ 05.08.2024"
                proposals={proposals}
              />
            </Link>
          </div>
          <div className="card-container">
            <Link href="/goal-overview">
              <ProposalCard
                title="Title Title Title Title Title Title Title Title Title Title Title ?"
                tradingPeriod="05.07.2024 ~ 05.08.2024"
                proposals={proposals}
              />
            </Link>
          </div>
          <div className="card-container">
            <Link href="/goal-overview">
              <ProposalCard
                title="Title Title Title Title Title Title Title Title Title Title Title ?"
                tradingPeriod="05.07.2024 ~ 05.08.2024"
                proposals={proposals}
              />
            </Link>
          </div>
          <div className="card-container">
            <Link href="/goal-overview">
              <ProposalCard
                title="Title Title Title Title Title Title Title Title Title Title Title ?"
                tradingPeriod="05.07.2024 ~ 05.08.2024"
                proposals={proposals}
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
