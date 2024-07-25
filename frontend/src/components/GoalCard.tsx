import {Box, Stack} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";

interface ProposalCardProps {
  goal: any;
  proposals: any[];
  votingDeadline: number;
}

const GoalCard: React.FC<ProposalCardProps> = ({
  goal,
  proposals,
  votingDeadline,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bg="white"
      boxShadow="md"
      style={{ minWidth: "20rem" }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StarIcon color="gray.300" />
      </div>

      <Stack spacing={3}>
        <h1>{goal.title}</h1>
        {/* <Text fontSize="sm">
          State: {goal.state}
        </Text> */}
        <h3>Proposal:</h3>
        {proposals.map((proposal, index) => (
          <Box key={index} bg="gray.100" p="4" borderRadius="md">
            {proposal.title}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default GoalCard;
