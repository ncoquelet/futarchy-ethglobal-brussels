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
import { IPFS_API_KEY } from "../config";
import { convertToSeconds } from "@/utils/DateUtils";
import { useRouter } from "next/navigation";

export default function GoalForm() {
  const router = useRouter();
  const { createGoal } = useFutarchy();
  const apiKey: string = IPFS_API_KEY || "";

  async function submit(formData: any) {
    const goalMetadata = {
      title: formData.get("title"),
      overview: formData.get("overview"),
      rules: formData.get("rules"),
      externalLink: formData.get("externalLink"),
    };
    const votingDeadline = BigInt(
      convertToSeconds(formData.get("votingDeadline")),
    );
    const goalMaturity = BigInt(convertToSeconds(formData.get("goalMaturity")));
    const response = await lighthouse.uploadText(
      JSON.stringify(goalMetadata),
      apiKey,
    );
    const cid = response.data.Hash;

    const proposalMetadata = {
      title: formData.get("proposal"),
      overview: "",
      externalLink: "",
    };
    const proposalResponse = await lighthouse.uploadText(
      JSON.stringify(proposalMetadata),
      apiKey,
    );
    const pcid = proposalResponse.data.Hash;

    const goalValue = BigInt(Number(formData.get("goalValue")));

    await createGoal(cid, pcid, goalValue, votingDeadline, goalMaturity);
    router.push("/");
  }

  return (
    <form action={submit}>
      <Box
        maxW="600px"
        mx="auto"
        p={4}
        style={{ marginTop: "3rem", marginBottom: "12rem" }}
      >
        <h2 style={{ marginBottom: "2rem" }}>Make a goal</h2>
        <VStack spacing={4} align="stretch">
          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              defaultValue="Achieve a 5% increase in turnover within one year."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Overview</FormLabel>
            <Textarea
              name="overview"
              defaultValue="As a company, our goal is to achieve a 5% increase in turnover within the next year by enhancing our product offerings, We are committed to implementing strategic initiatives that will drive growth and deliver value to our stakeholders."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Proposal</FormLabel>
            <Textarea
              name="proposal"
              defaultValue="Partnering with artists to launch a new line of our best-selling product."
            />
          </FormControl>

          <FormControl>
            <FormLabel>Goal value</FormLabel>
            <Input defaultValue="5" name="goalValue" type="goalValue" />
          </FormControl>

          <FormControl>
            <FormLabel>Trading phase duration</FormLabel>
            <Select name="votingDeadline" placeholder="Select duration">
              <option value="5d">5 days</option>
              <option value="10d">10 days</option>
              <option value="1m">1 month</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Testing phase duration</FormLabel>
            <Select name="goalMaturity" placeholder="Select duration">
              <option value="3m">3 months</option>
              <option value="6m">6 months</option>
              <option value="1y">1 year</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Rules</FormLabel>
            <Textarea
              name="rules"
              defaultValue="If NO wins, the proposal is not adopted, and every bet is refunded. If YES wins, the proposal is adopted. If the goal is reached before the resolution date, those who bet on YES are rewarded. If not, those who bet on NO are rewarded."
            />
          </FormControl>

          <FormControl>
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
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              bg="customBlue.100"
              color="white"
              borderColor="customBlue.100"
              size="md"
              type="submit"
            >
              Create
            </Button>
          </HStack>
        </VStack>
      </Box>
    </form>
  );
}
