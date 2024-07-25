import {
  Goal,
  Proposal,
  ProposalStatus,
  ProposalStatusLabel,
} from "@/context/FutarchyContext";
import { Badge } from "@chakra-ui/react";

interface GoalStatusBadgeProps {
  goal: Goal;
}

export const GoalStatusBadge = ({ goal }: GoalStatusBadgeProps) => {
  const proposal = goal.proposals[goal.currentProposal];
  const badgeColor = (proposal: Proposal): string => {
    switch (proposal.status) {
      case ProposalStatus.VoteStarted:
        return "blue";
      case ProposalStatus.VoteCancelled:
        return "orange";
      case ProposalStatus.VoteAccepted:
        return "purple";
      case ProposalStatus.VoteClosed:
        return proposal.goalAchieved ? "green" : "red";
      case ProposalStatus.Waiting:
      default:
        return "gray";
    }
  };

  return (
    <Badge colorScheme={badgeColor(proposal)}>
      {ProposalStatusLabel[proposal.status]}
    </Badge>
  );
};
