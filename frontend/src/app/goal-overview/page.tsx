"use client";

import { Goal, useFutarchy } from "@/context/FutarchyContext";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense
import Loading from "../../components/Loading";
import { convertToText } from "@/utils/DateUtils";
import { ProposalCard } from "@/components/ProposalCard";

function GoalOverviewContent() {
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  const { goals } = useFutarchy();
  const goal = goals.find((goal) => goal.addr == goalAddress) as Goal;

  return (
    <div className="font-satoshi">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional"
      />
      <div
        style={{
          marginLeft: "8rem",
          marginRight: "8rem",
          marginBottom: "2rem",
          marginTop: "4rem",
        }}
      >
        <div style={{ display: "flex", marginBottom: "1.5rem" }}>
          <div
            style={{ fontSize: "2rem", fontWeight: "bold", flex: "0 0 60%" }}
          >
            {goal.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem;",
          }}
        >
          <Wrap>
            <WrapItem>
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
            </WrapItem>
          </Wrap>
          <h3 style={{ marginLeft: "0.5rem" }}>proposed by 0x8f9af</h3>
        </div>

        <div style={{ display: "flex", marginBottom: "3rem" }}>
          <div style={{ flex: "0 0 65%", paddingRight: "15rem" }}>
            <div style={{ marginTop: "2rem" }}>
              <h2>Overview</h2>
              <h3>{goal.overview}</h3>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <h2>Goal value</h2>
              <h3>{goal.goalValue}%</h3>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <h2>Rules</h2>
              <h3>{goal.rules}</h3>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <h2>External link</h2>
              <h3>{goal.externalLink}</h3>
            </div>
          </div>
          <div style={{ flex: "0 0 35%" }}>
            <div className="grey-card" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="material-symbols-outlined">show_chart</span>
                <h2 style={{ marginLeft: "0.5rem" }}>Trading phase duration</h2>
              </div>
              <h3>{convertToText(goal.votingDeadline)}</h3>
            </div>
            <div className="grey-card" style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="material-symbols-outlined">check</span>
                <h2 style={{ marginLeft: "0.5rem" }}>
                  Proposal testing duration
                </h2>
              </div>
              <h3>{convertToText(goal.goalMaturity)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#25262A",
          minHeight: "28rem;",
          paddingLeft: "8rem",
          marginBottom: "2rem",
          paddingTop: "2rem",
        }}
      >
        <div style={{ color: "white", display: "flex" }}>
          <span className="material-symbols-outlined">how_to_vote</span>
          <h2
            style={{
              color: "white",
              paddingBottom: "2rem",
              marginLeft: "0.5rem",
            }}
          >
            Time to vote to proposals!
          </h2>
        </div>
        <div className="proposal-card-list">
          {goal.proposals?.map((proposal, index) => (
            <ProposalCard key={`proposal_${index}`} proposal={proposal} />
          ))}
          <div style={{ marginBottom: "6rem" }}>
            <Link
              href={{
                pathname: "/proposal-create",
                query: { goalAddress: goal.addr },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="60px"
                viewBox="0 -960 960 960"
                width="60px"
                fill="#e8eaed"
              >
                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoalOverview() {
  return (
    <Suspense fallback={<Loading />}>
      <GoalOverviewContent />
    </Suspense>
  );
}
