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
        <div style={{ flex: "0 0 30%" }}>
          <div>
            <div
              className="hero-text font-satoshi text-4xl font-bold mb-4"
              style={{ marginTop: "1rem" }}
            >
              Chose a goal and reach it with community
            </div>
          </div>
          <div>
            <Button bg="white" color="customBlue.100" size="md">
              <Link href="/goal-create">New goal</Link>
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: "0 0 50%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Image
              src="/sunset.png"
              width={350}
              height={350}
              alt="Picture of a sunset"
            />
          </div>
        </div>
      </div>
      <div className="section" style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginTop: "1rem" }}>New goals</h1>
        <div className="card-list">{cardList}</div>
      </div>
    </main>
  );
}
