import { Box, Text, Stack } from '@chakra-ui/react';

interface ProposalCardProps {
  title: string;
  tradingPeriod: string;
  proposals: string[];
}

const ProposalCard: React.FC<ProposalCardProps> = ({ title, tradingPeriod, proposals }) => {
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
          {title}
        </Text>
        <Text fontSize="sm">
          Trading: {tradingPeriod}
        </Text>
        <Text fontWeight="bold">
          3 Proposals
        </Text>
        {proposals.map((proposal, index) => (
          <Box
            key={index}
            bg="gray.100"
            p="4"
            borderRadius="md"
          >
            {proposal}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProposalCard;
