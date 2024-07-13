"use client";
import Link from 'next/link'
import Image from 'next/image'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function GoalOverview() {
  return (
    <div>
      <h3>category: ecology</h3>
      <h3>state: actif</h3>
      <h1>Reduce my city's CO2 emissions by 1% in one year</h1>
      <h3>proposed by: 0x456787456789865678985678</h3>

      <div style={{display: 'flex;', width: '100%' }}>
        <div style={{display: 'flex;', width: '65%' }}>
          <h2>Overview</h2>
          <h3>Quick description of the goal</h3>
          <h2>Motivation, Goal</h2>
          <p>Complete description of the goal</p>
          <h2>Rules</h2>
          <p>If my city's CO2 emissions reduce reduce by <=1%, voters on YES win.</p>
          <p>If not, voters on NO win.</p>



          

        </div>
        <div style={{display: 'flex;', width: '35%' }}>
          <div>
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
