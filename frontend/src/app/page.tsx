"use client";
import Link from "next/link";
import Image from "next/image";
import ProposalCard from "../components/ProposalCard";
import React, { useState } from "react";

// Chakra UI
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useFutarchy } from "@/context/FutarchyContext";

export default function Home() {
  const { goals } = useFutarchy();
  //get the goals from address

  const cardList = goals.map((goal) => (
    <div className="card-container" key={goal.address}>
      <Link
        href={{
          pathname: "/goal-overview",
          query: { goalAddress: goal.address }, // the data
        }}
      >
        <ProposalCard
          goal={goal}
          votingDeadline={goal.votingDeadline}
          proposals={goal.proposals}
        />
      </Link>
    </div>
  ));

  return (
    <main className="p-4 font-satoshi">
      <div
        className="hero"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <div>
            <div className="hero-text font-satoshi text-4xl font-bold mb-4">
              Drop your goal and test it with community
            </div>
          </div>
          <div>
            <Button colorScheme="blue" size="sm">
              <Link href="/goal-create">Test your goal</Link>
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
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
        <div className="card-list">{cardList}</div>
      </div>
    </main>
  );
}
