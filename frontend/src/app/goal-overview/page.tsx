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
              <h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</h3>
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
            <div style={{backgroundColor: '#D4E5FA', borderRadius:'10px', paddingLeft: '1rem', paddingRight: '1rem', paddingTop:'0.5rem', paddingBottom:'0.5rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
          <div className="proposal-card inactive-card">
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
            <div style={{backgroundColor: '#D4E5FA', borderRadius:'10px', paddingLeft: '1rem', paddingRight: '1rem', paddingTop:'0.5rem', paddingBottom:'0.5rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
          <div className="proposal-card inactive-card">
            <p>Proposal 3</p>
            <h2>Increase bike lanes</h2>
            <div style={{display: 'flex;'}}>
              <div style={{width: '50%', margin: '1rem'}}>
                YES
              </div>
              <div style={{width: '50%', margin: '1rem'}}>
                NO
              </div>
            </div>
            <div></div>
            <div style={{backgroundColor: '#D4E5FA', borderRadius:'10px', paddingLeft: '1rem', paddingRight: '1rem', paddingTop:'0.5rem', paddingBottom:'0.5rem' }}>
              13 ETH is staked in the pool
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
