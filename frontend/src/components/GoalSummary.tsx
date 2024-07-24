import { Heading, Text } from "@chakra-ui/react";
import { Goal } from "@/context/FutarchyContext";
import dayjs from "dayjs";

type GoalSummaryProps = {
  goal: Goal;
};

export const GoalSummary = ({ goal }: GoalSummaryProps) => {
  const tradingEndDate = goal.startTime
    ? dayjs.unix(goal.startTime).add(goal.votingDeadline, "second")
    : undefined;
  const goalMaturityDate = goal.startTime
    ? dayjs.unix(goal.startTime).add(goal.goalMaturity, "second")
    : undefined;

  return (
    <div className="grey-card" style={{ marginBottom: "1rem" }}>
      <Heading as="h4" size="md" pb={4}>
        Informations
      </Heading>
      <Heading as="h5" size="xs">
        Goal value
      </Heading>
      <Text fontSize="md">+{goal.goalValue}%</Text>
      <Heading as="h5" size="xs" pt={2}>
        Goal achievement
      </Heading>
      <Text fontSize="md">
        {goalMaturityDate ? goalMaturityDate.format("YYYY-MM-DD") : "pending"}
      </Text>
      {/*<Heading as="h5" size="xs" pt={2}>
        Trading until
      </Heading>
      <Text fontSize="md">
        {tradingEndDate ? tradingEndDate.format("YYYY-MM-DD") : "pending"}
      </Text>*/}
    </div>
  );
};
