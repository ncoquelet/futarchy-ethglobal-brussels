"use client";

import { useFutarchy } from "@/context/FutarchyContext";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import lighthouse from "@lighthouse-web3/sdk";
import { title } from "process";
import { IPFS_API_KEY } from "../config";

export default function GoalForm() {
  const { createGoal } = useFutarchy();
  const apiKey: string = IPFS_API_KEY || "";

  const convertToSeconds = (value: string) => {
    switch (value) {
      case "5d":
        return 5 * 24 * 60 * 60;
      case "10d":
        return 10 * 24 * 60 * 60;
      case "1m":
        return 30 * 24 * 60 * 60;
      case "3m":
        return 3 * 30 * 24 * 60 * 60;
      case "6m":
        return 6 * 30 * 24 * 60 * 60;
      case "1y":
        return 12 * 30 * 24 * 60 * 60;
      default:
        return 0;
    }
  };

  async function submit(formData: any) {
    const goalMetadata = {
      title: formData.get("title"),
      overview: formData.get("overview"),
      rules: formData.get("rules"),
      externalLink: formData.get("externalLink"),
    };
    const votingDeadline = BigInt(
      convertToSeconds(formData.get("votingDeadline"))
    );
    const goalMaturity = BigInt(convertToSeconds(formData.get("goalMaturity")));
    const response = await lighthouse.uploadText(
      JSON.stringify(goalMetadata),
      apiKey
    );
    const cid = response.data.Hash;

    const goalValue = BigInt(Number(formData.get("goalValue")));

    createGoal(cid, goalValue, votingDeadline, goalMaturity);
  }

  return (
    <form action={submit}>
      <Box
        maxW="600px"
        mx="auto"
        p={4}
        style={{ marginTop: "3rem", marginBottom: "12rem" }}
      >
        <h2 style={{ marginBottom: "4rem" }}>Make a goal</h2>
        <VStack spacing={4} align="stretch">
          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              defaultValue="Achieve a 5% increase in turnover within one year."
            />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Overview</FormLabel>
            <Textarea
              name="overview"
              defaultValue="As a company, our goal is to achieve a 5% increase in turnover within the next year by enhancing our product offerings, We are committed to implementing strategic initiatives that will drive growth and deliver value to our stakeholders."
            />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Goal value</FormLabel>
            <Input defaultValue="5" name="goalValue" type="goalValue" />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Trading phase duration</FormLabel>
            <Select name="votingDeadline" placeholder="Select duration">
              <option value="5d">5 days</option>
              <option value="10d">10 days</option>
              <option value="1m">1 month</option>
            </Select>
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Testing phase duration</FormLabel>
            <Select name="goalMaturity" placeholder="Select duration">
              <option value="3m">3 months</option>
              <option value="6m">6 months</option>
              <option value="1y">1 year</option>
            </Select>
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Rules</FormLabel>
            <Textarea
              name="rules"
              defaultValue="If the goal is achieved, voters on Yes win. If not, voters on No win."
            />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>External link (Optional)</FormLabel>
            <Input name="externalLink" defaultValue="https://www.ledger.com/" />
          </FormControl>

          <HStack justify="space-between" style={{ marginTop: "3rem" }}>
            <Button
              variant="outline"
              color="customBlue.100"
              colorScheme="blue"
              borderColor="customBlue.100"
              size="md"
            >
              Precedent
            </Button>
            <Button
              bg="customBlue.100"
              color="white"
              borderColor="customBlue.100"
              size="md"
              type="submit"
            >
              Next
            </Button>
          </HStack>
        </VStack>
      </Box>
    </form>
  );
}
