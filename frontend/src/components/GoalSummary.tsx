import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Goal, useFutarchy } from "@/context/FutarchyContext";
import dayjs from "dayjs";
import { GoalStatusBadge } from "@/components/GoalStatusBadge";
import { useState } from "react";

type GoalSummaryProps = {
  goal: Goal;
};

export const GoalSummary = ({ goal }: GoalSummaryProps) => {
  const { goalAchieved, fakeOracle } = useFutarchy();

  const tradingEndDate = goal.startTime
    ? dayjs.unix(goal.startTime).add(goal.votingDeadline, "second")
    : undefined;
  const goalMaturityDate = goal.startTime
    ? dayjs.unix(goal.startTime).add(goal.goalMaturity, "second")
    : undefined;

  const closeMaturityHanlder = async () => {
    await fakeOracle(goal.oracle, value);
    onClose();
    await goalAchieved(goal.addr);
  };

  const [value, setValue] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="grey-card" style={{ marginBottom: "1rem" }}>
      <Heading as="h4" size="md" pb={4}>
        Informations
      </Heading>
      <Heading as="h5" size="xs">
        Status
      </Heading>
      <GoalStatusBadge goal={goal} />
      <Heading as="h5" size="xs" mt={3}>
        Goal value
      </Heading>
      <HStack spacing="20px">
        <Text
          fontSize="md"
          decoration={goal.maturityValue > 0 ? "line-through" : "none"}
        >
          {`+${goal.goalValue}%`}
        </Text>
        {goal.maturityValue > 0 && (
          <Text
            fontSize="md"
            as="b"
            color={goal.maturityValue >= goal.goalValue ? "green" : "red"}
          >
            +${goal.maturityValue}%`
          </Text>
        )}
      </HStack>
      <Heading as="h5" size="xs" pt={2}>
        Goal achievement
      </Heading>
      <Text fontSize="md">
        {!goalMaturityDate ? (
          "pending"
        ) : (
          <>
            {goalMaturityDate.format("YYYY-MM-DD")}
            <Link ml={4} color="teal.500" href="#" onClick={onOpen}>
              force validation
            </Link>
          </>
        )}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Fake value</FormLabel>
              <NumberInput
                onChange={(valueString) => setValue(Number(valueString))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>Send any value to the fake oracle</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => closeMaturityHanlder()}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
