import {
  Goal,
  Proposal,
  ProposalStatus,
  useFutarchy,
} from "@/context/FutarchyContext";
import { Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface ProposalCardProps {
  goal: Goal;
  proposal: Proposal;
}

export const ProposalCard = ({ goal, proposal }: ProposalCardProps) => {
  const { buyYes, buyNo } = useFutarchy();

  const total = Number(proposal.balanceYes + proposal.balanceNo);
  const yesPercent =
    total > 0 ? Math.round((Number(proposal.balanceYes) * 100) / total) : 50;
  const noPercent =
    total > 0 ? Math.round((Number(proposal.balanceNo) * 100) / total) : 50;

  const tradingOpen = proposal.status == ProposalStatus.VoteStarted;

  const buyYesHandler = () => {
    if (proposal.status != ProposalStatus.VoteStarted) return;
    if (proposal.status) buyYes(proposal.addr, 1);
  };

  const buyNoHandler = () => {
    if (proposal.status != ProposalStatus.VoteStarted) return;
    if (proposal.status) buyYes(proposal.addr, 1);
  };

  const tradingEndDate = goal.startTime
    ? dayjs.unix(goal.startTime).add(goal.votingDeadline, "second")
    : undefined;

  return (
    <div className="grey-card" style={{ marginBottom: "1rem" }}>
      <Heading as="h4" size="md" pb={4}>
        {proposal.title}
      </Heading>
      <Heading as="h5" size="xs" pt={2}>
        Trading until
      </Heading>
      <Text fontSize="md">
        {tradingEndDate ? tradingEndDate.format("YYYY-MM-DD") : "pending"}
      </Text>
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
            cursor: "pointer",
            pointerEvents: tradingOpen ? "auto" : "none",
          }}
          onClick={() => buyYesHandler()}
        >
          <div>
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
            cursor: "pointer",
          }}
          onClick={() => buyNo(proposal.addr, 1)}
        >
          <div>
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
      <ProgressBar yesPercent={yesPercent} noPercent={noPercent} />
      {/*<div
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
      </div>*/}
    </div>
  );
};

export const ProgressBar = ({
  yesPercent,
  noPercent,
}: {
  yesPercent: number;
  noPercent: number;
}) => {
  return (
    <div style={{ display: "flex", marginTop: "0.8rem", marginBottom: "0" }}>
      <div
        style={{
          width: `${yesPercent}%`,
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          backgroundColor: "#1DBF1A",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ color: "white", marginLeft: "1rem", fontWeight: "bold" }}>
          {`${yesPercent}%`}
        </div>
      </div>
      <div
        style={{
          width: `${noPercent}%`,
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
          {`${noPercent}%`}
        </div>
      </div>
    </div>
  );
};
