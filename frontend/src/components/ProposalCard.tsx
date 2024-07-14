import { Box, Text, Stack } from "@chakra-ui/react";

interface ProposalCardProps {
  goal: any;
  proposals: any[];
  votingDeadline: number;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
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
      mt="4"
    >
      <Stack spacing={3}>
        <Text fontWeight="bold" fontSize="lg">
          {goal.title}
        </Text>
        <Text fontSize="sm">State: {goal.state}</Text>
        <Text fontWeight="bold">{proposals.length} Proposals</Text>
        {proposals.map((proposal, index) => (
          <Box key={index} bg="gray.100" p="4" borderRadius="md">
            {proposal.title}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProposalCard;
