"use client";

import { Goal, useFutarchy } from "@/context/FutarchyContext";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  ButtonGroup,
  Progress,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense
import Loading from "../../components/Loading"; // Make sure this path is correct

function GoalOverviewContent() {
  const { buyYes, buyNo } = useFutarchy();
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  const { goals } = useFutarchy();
  const goal = goals.find((goal) => goal.addr == goalAddress) as Goal;

  const convertToText = (seconde: number) => {
    switch (seconde) {
      case 5 * 24 * 60 * 60:
        return "5 days";
      case 10 * 24 * 60 * 60:
        return "10 days";
      case 30 * 24 * 60 * 60:
        return "1 month";
      case 3 * 30 * 24 * 60 * 60:
        return "3 months";
      case 6 * 30 * 24 * 60 * 60:
        return "6 months";
      case 12 * 30 * 24 * 60 * 60:
        return "1 year";
      default:
        return "-";
    }
  };

  const proposalList = goal.proposals.map((proposal, index) => (
    <div
      className="proposal-card"
      key={proposal.title}
      style={{ marginBottom: "6rem" }}
    >
      <p>Proposal {index + 1}</p>
      <h2>{proposal.title}</h2>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <div
          style={{
            width: "50%",
            borderRadius: "10px",
            backgroundColor: "#8DF69D",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "0.3rem",
            minHeight: "10rem",
          }}
        >
          <div onClick={() => buyYes(proposal.addr, 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="60px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="#1DBF1A"
            >
              <path d="m423.23-309.85 268.92-268.92L650-620.92 423.23-394.15l-114-114L267.08-466l156.15 156.15ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z" />
            </svg>
          </div>
          <h2>buy YES</h2>
        </div>
        <div
          style={{
            width: "50%",
            borderRadius: "10px",
            backgroundColor: "#FCCCCC",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "0.3rem",
            minHeight: "10rem",
          }}
        >
          <div onClick={() => buyNo(proposal.addr, 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="60px"
              viewBox="0 -960 960 960"
              width="60px"
              fill="#FF6B6B"
            >
              <path d="m336-293.85 144-144 144 144L666.15-336l-144-144 144-144L624-666.15l-144 144-144-144L293.85-624l144 144-144 144L336-293.85ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z" />
            </svg>
          </div>
          <h2>buy NO</h2>
        </div>
      </div>
      <div
        style={{ display: "flex", marginTop: "0.6rem", marginBottom: "1.2rem" }}
      >
        <div
          style={{
            width: "30%",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            backgroundColor: "#1DBF1A",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{ color: "white", marginLeft: "1rem", fontWeight: "bold" }}
          >
            30%
          </div>
        </div>
        <div
          style={{
            width: "70%",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundColor: "#FF6B6B",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{ color: "white", marginRight: "1rem", fontWeight: "bold" }}
          >
            70%
          </div>
        </div>
      </div>
      <div></div>
      <div
        style={{
          backgroundColor: "#D4E5FA",
          borderRadius: "10px",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
        }}
      >
        {Number(proposal.balanceYes + proposal.balanceNo)} ETH is staked in the
        pool
      </div>
    </div>
  ));

  return (
    <div className="font-satoshi">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
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
          {proposalList}
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
