"use client";

import { Goal, useFutarchy } from "@/context/FutarchyContext";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Import Suspense
import Loading from "../../components/Loading";
import { ProposalCard } from "@/components/ProposalCard";
import { GoalSummary } from "@/components/GoalSummary";

function GoalOverviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  const { goals } = useFutarchy();
  const goal = goals.find((goal) => goal.addr == goalAddress) as Goal;

  if (!goal) {
    return (
      <Container maxW="1000px" pt={5}>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="1000px" pt={5}>
      <div className="font-satoshi">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional"
        />
        <Box>
          {/* Deux colonnes */}
          <Flex mt={8} gap={8}>
            <Box flex="0 0 70%">
              <Heading size="xl" mb={1}>
                {goal.title}
              </Heading>
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
              <Heading size="lg" mt={7} mb={4}>
                Overview
              </Heading>
              <Text fontSize="lg">{goal.overview}</Text>
              <Heading size="lg" my={4}>
                Rules
              </Heading>
              <Text fontSize="lg">{goal.rules}</Text>
              <Heading size="lg" my={4}>
                External link
              </Heading>
              <Text fontSize="lg">{goal.externalLink}</Text>
            </Box>
            <Box flex="0 0 30%">
              <GoalSummary goal={goal} />
              {goal.proposals.length > 0 && (
                <ProposalCard goal={goal} proposal={goal.proposals[0]} />
              )}
            </Box>
          </Flex>
        </Box>
      </div>
    </Container>
  );
}

export default function GoalOverview() {
  return (
    <Suspense fallback={<Loading />}>
      <GoalOverviewContent />
    </Suspense>
  );
}
