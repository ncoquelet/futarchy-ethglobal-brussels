import {
  Goal,
  ProposalStatus,
  ProposalStatusLabel,
} from "@/context/FutarchyContext";
import { Badge } from "@chakra-ui/react";

interface GoalStatusBadgeProps {
  goal: Goal;
}

export const GoalStatusBadge = ({ goal }: GoalStatusBadgeProps) => {
  const proposal = goal.proposals[goal.currentProposal];
  const badgeColor = (status: number): string => {
    switch (status) {
      case ProposalStatus.VoteStarted:
        return "blue";
      case ProposalStatus.VoteCancelled:
        return "red";
      case ProposalStatus.VoteAccepted:
        return "green";
      case ProposalStatus.VoteClosed:
        return "purple";
      case ProposalStatus.Waiting:
      default:
        return "gray";
    }
  };

  return (
    <Badge colorScheme={badgeColor(proposal.status)}>
      {ProposalStatusLabel[proposal.status]}
    </Badge>
  );
};
