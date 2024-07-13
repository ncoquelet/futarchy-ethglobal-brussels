"use client";
import Link from 'next/link'
import Image from 'next/image'

import { Progress } from '@chakra-ui/react'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function GoalOverview() {
  return (
    <div className="font-satoshi">
      <div style={{marginLeft: '8rem', marginRight: '8rem', marginBottom: '2rem;'}} >
        <h3>category: ecology</h3>
        <h3>state: actif</h3>
        <h1>Reduce my city's CO2 emissions by 1% in one year</h1>
        <h3>proposed by: 0x456787456789865678985678</h3>

        <div style={{display: 'flex'}}>
          <div style={{flex: '0 0 65%', paddingRight: '15rem'}}>
            <div style={{marginTop: '2rem'}}>
              <h2>Overview</h2>
              <h3>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</h3>
              {/* <h2>Motivation, Goal</h2>
              <p>Complete description of the goal</p> */}
            </div>
            <div style={{marginTop: '2rem'}}>
              <h2>Rules i</h2>
              <h3>If my city's CO2 emissions reduce reduce by =1%, voters on YES win.</h3>
              <h3>If not, voters on NO win.</h3>
            </div>
          </div>
          <div style={{flex: '0 0 35%'}}>
            <div className="grey-card" style={{marginBottom: '1rem'}}>
              <h2>Trading period</h2>
              <h3>delta t: 5d</h3>
            </div>
            <div className="grey-card" style={{marginBottom: '1rem'}}>
              <h2>Testing period</h2>
              <h3>delta t: 6m</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{backgroundColor: '#25262A', minHeight: '28rem;', paddingLeft: '8rem', marginBottom: '2rem', paddingTop: '2rem'}}>
        <div style={{color: 'white'}}>
          <h2 style={{color: 'white', paddingBottom: '2rem'}}>Time to vote to proposals!</h2>
        </div>
        <div className="proposal-card-list">
          <div className="proposal-card">
            <p>Proposal 1</p>
            <h2>Increase bike lanes</h2>
            <div style={{display: 'flex;'}}>
              <div style={{width: '50%', margin: '1rem' }}>
                YES
              </div>
              <div style={{width: '50%', margin: '1rem' }}>
                NO
              </div>
            </div>
            <div></div>
            <div style={{backgroundColor: '#D4E5FA', margin: '1rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
          <div className="proposal-card">
            <p>Proposal 2</p>
            <h2>Increase bike lanes</h2>
            <div style={{display: 'flex;'}}>
              <div style={{width: '50%', margin: '1rem' }}>
                YES
              </div>
              <div style={{width: '50%', margin: '1rem' }}>
                NO
              </div>
            </div>
            <div></div>
            <div style={{backgroundColor: '#D4E5FA', margin: '1rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
          <div className="proposal-card">
            <p>Proposal 3</p>
            <h2>Increase bike lanes</h2>
            <div style={{display: 'flex;'}}>
              <div style={{width: '50%', margin: '1rem' }}>
                YES
              </div>
              <div style={{width: '50%', margin: '1rem' }}>
                NO
              </div>
            </div>
            <div></div>
            <div style={{backgroundColor: '#D4E5FA', margin: '1rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
