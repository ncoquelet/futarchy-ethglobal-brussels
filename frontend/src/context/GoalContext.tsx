import { useSearchParams } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address, parseAbiItem } from "viem";
import { FROM_BLOCK, GOVERNANCE_CONTRACT_ADDRESS } from "@/app/config";

// Abis
import { ToastType } from "@/components/ToastGpt";
import { usePublicClient } from "wagmi";
import { waitForTransaction, writeContract } from "wagmi/actions";
import { abi as goalAbi } from "../abi/FutarchyGoal.json";
import { abi as governanceAbi } from "../abi/FutarchyGovernance.json";
import { abi as proposalAbi } from "../abi/FutarchyProposal.json";
import { abi as oracleAbi } from "../abi/FutarchyOracle.json";
import { useNotification } from "./NotificationContext";

type GoalContextProps = {
  currentGoal: Goal | undefined;
  createGoal(
    cid: string,
    pcid: string,
    goalValue: bigint,
    votingDeadline: bigint,
    goalMaturity: bigint,
  ): Promise<void>;
  endProposalVoting(proposal: Address): Promise<void>;
  goalAchieved(goal: Address): Promise<void>;
  fakeOracle(goal: Address, value: number): Promise<void>;
};

const GoalContext = createContext<GoalContextProps>({
  currentGoal: undefined,
  createGoal: async () => new Promise(() => {}),
  endProposalVoting: async () => new Promise(() => {}),
  goalAchieved: async () => new Promise(() => {}),
  fakeOracle: async () => new Promise(() => {}),
});

export type Goal = {
  addr: Address;
  oracle: Address;
  title: string;
  overview: string;
  rules: string;
  externalLink: string;
  votingDeadline: number;
  proposals: Proposal[];
  currentProposal: number;
  goalMaturity: number;
  goalValue: number;
  maturityValue: number;
  startTime: number;
};

type ContractGoal = {
  addr: Address;
  oracle: Address;
  remoteCid: string;
  proposals: Address[];
  goalMaturity: bigint;
  goalValue: bigint;
  maturityValue: bigint;
  votingDeadline: bigint;
  currentProposal: bigint;
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

export const ProposalStatusLabel = [
  "PENDING",
  "TRADING",
  "CANCELLED",
  "Accepted",
  "Closed",
];

type ContractProposal = {
  addr: Address;
  remoteCid: string;
  status: string;
  balanceYes: bigint;
  balanceNo: bigint;
  goalAchieved: boolean;
};

export const GoalProvider = ({ children }: PropsWithChildren) => {
  const contractAddress = GOVERNANCE_CONTRACT_ADDRESS as Address;
  console.log(`layout contractAddress ${contractAddress}`);
  const searchParams = useSearchParams();
  const goalAddress = searchParams.get("goalAddress");

  // connection
  const publicClient = usePublicClient();

  const { showNotification } = useNotification();

  const [goal, setGoal] = useState<Goal | undefined>(undefined);

  useEffect(() => {
    const fetchGoals = async () => {
      console.log("fetch Goals");
      const logs = await publicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event GoalAdded(uint _goalId, address _addr)"),
        fromBlock: BigInt(Number(FROM_BLOCK)),
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
            currentProposal: Number(goal.currentProposal),
            goalValue: Number(goal.goalValue),
            votingDeadline: Number(goal.votingDeadline),
            goalMaturity: Number(goal.goalMaturity),
            maturityValue: Number(goal.maturityValue),
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

  const fakeOracle = async (oracle: Address, value: number) => {
    try {
      const { hash } = await writeContract({
        address: oracle,
        abi: oracleAbi,
        functionName: "updateResult",
        args: [BigInt(value)],
      });

      await waitForTransaction({ hash });
      showNotification("Success", ToastType.SUCCESS);
    } catch (error) {
      showNotification("Error occured in console", ToastType.ERROR);
      console.log(error);
    }
  };

  return (
    <GoalContext.Provider
      value={{
        createGoal,
        endProposalVoting,
        goalAchieved,
        fakeOracle,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export function useGoal() {
  return useContext(GoalContext);
}
