import { useSearchParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address, parseAbiItem } from "viem";
import { GOVERNANCE_CONTRACT_ADDRESS } from "@/app/config";

// Abis
import { ToastType } from "@/components/ToastGpt";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { waitForTransaction, writeContract } from "wagmi/actions";
import { abi as goalAbi } from "../abi/FutarchyGoal.json";
import { abi as governanceAbi } from "../abi/FutarchyGovernance.json";
import { abi as proposalAbi } from "../abi/FutarchyProposal.json";
import { useNotification } from "./NotificationContext";

type FutarchyContextProps = {
  contractAddress: Address;
  isOwner: boolean;
  goals: Array<Goal>;
  createGoal(
    cid: string,
    pcid: string,
    goalValue: bigint,
    votingDeadline: bigint,
    goalMaturity: bigint,
  ): Promise<void>;
  createProposal(cid: string): Promise<void>;
  buyYes(proposal: Address, quantity: number): void;
  buyNo(proposal: Address, quantity: number): void;
  endProposalVoting(proposal: Address): void;
  goalAchieved(proposal: Address, quantity: number): void;
};

const FutarchyContext = createContext<FutarchyContextProps>({
  contractAddress: "0x" as Address,
  isOwner: false,
  goals: [],
  createGoal: async () => new Promise(() => {}),
  createProposal: async () => new Promise(() => {}),
  buyYes: () => {},
  buyNo: () => {},
  endProposalVoting: () => {},
  goalAchieved: () => {},
});

export type Goal = {
  addr: Address;
  title: string;
  overview: string;
  rules: string;
  externalLink: string;
  votingDeadline: number;
  proposals: Proposal[];
  currentProposal: Address;
  goalMaturity: number;
  goalValue: number;
  startTime: number;
};

type ContractGoal = {
  addr: Address;
  remoteCid: string;
  proposals: Address[];
  goalMaturity: bigint;
  goalValue: bigint;
  votingDeadline: bigint;
  currentProposal: Address;
  startTime: bigint;
};

export type Proposal = {
  addr: Address;
  status: number;
  balanceYes: number;
  balanceNo: number;
  goalAchieved: boolean;
  title: string;
  overview: string;
  externalLink: string;
};

export const ProposalStatus = {
  Waiting: 0,
  VoteStarted: 1,
  VoteCancelled: 2,
  VoteAccepted: 3,
  VoteClosed: 4,
};

type ContractProposal = {
  addr: Address;
  remoteCid: string;
  status: string;
  balanceYes: bigint;
  balanceNo: bigint;
  goalAchieved: boolean;
};

export const FutarchyProvider = ({ children }: PropsWithChildren) => {
  const contractAddress = GOVERNANCE_CONTRACT_ADDRESS as Address;
  console.log(`layout contractAddress ${contractAddress}`);
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  // connection
  const publicClient = usePublicClient();

  const { showNotification } = useNotification();

  // Current wallet address
  const { address } = useAccount();

  // Current wallet address
  const { data: owner, isLoading: isLoadingOwner } = useContractRead({
    address: contractAddress as Address,
    abi: governanceAbi,
    functionName: "owner",
  });

  const isOwner = address! && address === owner; // Is the current user the owner of the contract ?

  const [goals, setGoals] = useState<Array<Goal>>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      console.log("fetch Goals");
      const logs = await publicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event GoalAdded(uint _goalId, address _addr)"),
        fromBlock: BigInt(Number(0)),
      });

      const goals = await Promise.all(
        logs.map(async (log) => {
          const goal = (await publicClient.readContract({
            address: log.args._addr!,
            abi: goalAbi,
            functionName: "getGoal",
          })) as ContractGoal;

          let goalMetadata: any = {};
          try {
            const response = await fetch(
              `https://gateway.lighthouse.storage/ipfs/${goal.remoteCid}/`,
            );
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }

            goalMetadata = await response.json();
            console.log(goalMetadata);
          } catch (error) {
            console.error(error);
          }

          const proposals = await Promise.all(
            goal.proposals.map(async (propAddr) => {
              const proposal = (await publicClient.readContract({
                address: propAddr,
                abi: proposalAbi,
                functionName: "getProposal",
              })) as ContractProposal;

              let proposalMetadata: any = {};
              try {
                const response = await fetch(
                  `https://gateway.lighthouse.storage/ipfs/${proposal.remoteCid}/`,
                );
                if (!response.ok) {
                  throw new Error(`Response status: ${response.status}`);
                }

                proposalMetadata = await response.json();
                console.log(proposalMetadata);
              } catch (error) {
                console.error(error);
              }

              return {
                ...proposal,
                status: Number(proposal.status),
                title: proposalMetadata.title,
                overview: proposalMetadata.overview,
                externalLink: proposalMetadata.externalLink,
                balanceYes: Number(proposal.balanceYes),
                balanceNo: Number(proposal.balanceNo),
              } as Proposal;
            }),
          );

          return {
            ...goal,
            title: goalMetadata.title,
            overview: goalMetadata.overview,
            rules: goalMetadata.rules,
            externalLink: goalMetadata.externalLink,
            proposals: proposals,
            goalValue: Number(goal.goalValue),
            votingDeadline: Number(goal.votingDeadline),
            goalMaturity: Number(goal.goalMaturity),
            startTime: Number(goal.startTime),
          } as Goal;
        }),
      );
      setGoals(goals);
    };

    const intervalID = setInterval(fetchGoals, 2000);

    return () => {
      clearInterval(intervalID);
    };
  }, [publicClient, contractAddress]);

  const createGoal = async (
    cid: string,
    pcid: string,
    goalValue: bigint,
    votingDeadline: bigint,
    goalMaturity: bigint,
  ) => {
    try {
      const { hash } = await writeContract({
        address: contractAddress as Address,
        abi: governanceAbi,
        functionName: "createGoal",
        args: [cid, pcid, goalMaturity, goalValue, votingDeadline, true],
      });

      await waitForTransaction({ hash });
      showNotification("SUCCESS", ToastType.SUCCESS);
    } catch (error) {
      showNotification("ERROR", ToastType.ERROR);
    }
  };

  const endProposalVoting = async (goal: Address) => {
    try {
      const { hash } = await writeContract({
        address: goal,
        abi: goalAbi,
        functionName: "endProposalVoting",
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  const goalAchieved = async (goal: Address) => {
    try {
      const { hash } = await writeContract({
        address: goal,
        abi: goalAbi,
        functionName: "goalAchieved",
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  const createProposal = async (cid: string) => {
    console.log("Creating proposal for " + goalAddress);
    try {
      const { hash } = await writeContract({
        address: goalAddress as Address,
        abi: goalAbi,
        functionName: "createProposal",
        args: [cid],
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  const buyYes = async (proposal: Address, quantity: number) => {
    try {
      const { hash } = await writeContract({
        address: proposal,
        abi: proposalAbi,
        functionName: "buyYes",
        value: BigInt(quantity),
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  const buyNo = async (proposal: Address, quantity: number) => {
    try {
      const { hash } = await writeContract({
        address: proposal,
        abi: proposalAbi,
        functionName: "buyNo",
        value: BigInt(quantity),
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  return (
    <FutarchyContext.Provider
      value={{
        contractAddress,
        isOwner,
        goals,
        createGoal,
        createProposal,
        buyYes,
        buyNo,
        endProposalVoting,
        goalAchieved,
      }}
    >
      {children}
    </FutarchyContext.Provider>
  );
};

export function useFutarchy() {
  return useContext(FutarchyContext);
}
