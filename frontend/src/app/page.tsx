"use client";
import Link from 'next/link'
import Image from 'next/image'

// Chakra UI
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
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
      <h1>List of goals</h1>
      <h2><Link href="/goal-overview">goal 1</Link></h2>
      <h2><Link href="/goal-overview">goal 2</Link></h2>
      <h2><Link href="/goal-overview">goal 3</Link></h2>
    </main>
  );
}
