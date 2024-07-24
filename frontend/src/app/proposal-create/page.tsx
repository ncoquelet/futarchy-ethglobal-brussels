"use client";

import { useFutarchy } from "@/context/FutarchyContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import lighthouse from "@lighthouse-web3/sdk";
import { IPFS_API_KEY } from "../config";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProposalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  const { createProposal } = useFutarchy();
  const apiKey: string = IPFS_API_KEY || "";

  async function submit(formData: any) {
    const goalMetadata = {
      title: formData.get("title"),
      overview: formData.get("overview"),
      externalLink: formData.get("externalLink"),
    };
    const response = await lighthouse.uploadText(
      JSON.stringify(goalMetadata),
      apiKey,
    );
    const cid = response.data.Hash;
    await createProposal(cid);
    router.back();
  }

  return (
    <form action={submit}>
      <Box
        maxW="600px"
        mx="auto"
        p={4}
        style={{ marginTop: "3rem", marginBottom: "12rem" }}
      >
        <h2 style={{ marginBottom: "4rem" }}>Make a proposal</h2>
        <VStack spacing={4} align="stretch">
          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Title</FormLabel>
            <Input name="title" placeholder="Adding more bicyles facilities" />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>Overview</FormLabel>
            <Textarea
              name="overview"
              placeholder="This proposal aims to encourage people using more their bicycles and less their cars..."
            />
          </FormControl>

          <FormControl style={{ marginTop: "1rem" }}>
            <FormLabel>External link (Optional)</FormLabel>
            <Input name="externalLink" placeholder="www.bougezvousauvelo.fr" />
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
