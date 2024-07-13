"use client";
import Link from 'next/link'
import Image from 'next/image'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function GoalOverview() {
  return (
    <div className="section">
      <h3>category: ecology</h3>
      <h3>state: actif</h3>
      <h1>Reduce my city's CO2 emissions by 1% in one year</h1>
      <h3>proposed by: 0x456787456789865678985678</h3>

      <div style={{display: 'flex;', justifyContent: 'space-around', width: '100%' }}>
        <div style={{width: '65%'}}>
          <h2>Overview</h2>
          <h3>This proposal aims to explore the potential environmental benefits of expanding the city's bike lane network by 20%. Specifically, it seeks to determine whether such an expansion can lead to a 1% reduction in the city's CO2 emissions within one year. The proposal outlines the rationale behind this initiative, the goals to be achieved, and the detailed steps required to implement and evaluate the impact of increasing bike lanes.</h3>
          {/* <h2>Motivation, Goal</h2>
          <p>Complete description of the goal</p> */}
          <h2>Rules i</h2>
          <h3>If my city's CO2 emissions reduce reduce by =1%, voters on YES win.</h3>
          <h3>If not, voters on NO win.</h3>

        </div>
        <div style={{width: '35%', marginLeft: '6rem'}}>
          <div className="greyCard">
            <h2>Trading period</h2>
          </div>
          <div>
            <h2>Testing period</h2>
          </div>
          <div>
            <h2>Current results</h2>
            <div>
              40% YES
            </div>
            <div>
              60% NO
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
