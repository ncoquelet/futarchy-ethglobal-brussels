import { useParams } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address, etherUnits, parseAbiItem } from "viem";
import { GOVERNANCE_CONTRACT_ADDRESS } from "../app/config";

// Abis
import { abi as governanceAbi } from "../abi/FutarchyGovernance.json";
import { abi as goalAbi } from "../abi/FutarchyGoal.json";
import { abi as proposalAbi } from "../abi/FutarchyProposal.json";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { waitForTransaction, writeContract } from "wagmi/actions";
import { ToastType } from "@/components/ToastGpt";
import { useNotification } from "./NotificationContext";
import { log } from "console";

type FutarchyContextProps = {
  contractAddress: Address;
  isOwner: boolean;
  goals: Array<Goal>;
  createGoal(
    cid: string,
    goalValue: bigint,
    votingDeadline: bigint,
    goalMaturity: bigint
  ): void;
  createProposal(cid: string): void;
  buyYes(proposal: Address, quantity: number): void;
  buyNo(proposal: Address, quantity: number): void;
  endProposalVoting(proposal: Address): void;
  goalAchieved(proposal: Address, quantity: number): void;
};

const FutarchyContext = createContext<FutarchyContextProps>({
  contractAddress: "0x" as Address,
  isOwner: false,
  goals: [],
  createGoal: () => {},
  createProposal: () => {},
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
};

export type Proposal = {
  addr: Address;
  status: string;
  balanceYes: bigint;
  balanceNo: bigint;
  goalAchieved: boolean;
};

export const FutarchyProvider = ({ children }: PropsWithChildren) => {
  const contractAddress = GOVERNANCE_CONTRACT_ADDRESS as Address;
  console.log(`layout contractAddress ${contractAddress}`);
  const { goalAddress } = useParams();

  // connection
  const publicClient = usePublicClient();
  const { address: account } = useAccount();

  const { showNotification } = useNotification();

  // Current wallet address
  const { address, isDisconnected } = useAccount();

  // Current wallet address
  const {
    data: owner,
    isLoading: isLoadingOwner,
    refetch,
  } = useContractRead({
    address: contractAddress as Address,
    abi: governanceAbi,
    functionName: "owner",
  });

  const isOwner = address! && address === owner; // Is the current user the owner of the contract ?

  const [goals, setGoals] = useState<Array<Goal>>([]);
  const [proposals, setProposals] = useState<Array<Proposal>>([]);

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
          })) as {
            addr: Address;
            remoteCid: string;
            proposals: Array<Address>;
            startTime: bigint;
          };
          let goalMetadata: any = {};
          fetch(`https://gateway.lighthouse.storage/ipfs/${goal.remoteCid}/`)
            .then((response: Response) => {
              if (response.ok) return (goalMetadata = response.json());
              throw new Error("Network response was not ok.");
            })
            .catch((error: Error) => {
              console.error("Failed to save the file:", error);
            });

          const proposals = await Promise.all(
            goal.proposals.map(async (propAddr) => {
              const proposal = (await publicClient.readContract({
                address: propAddr,
                abi: proposalAbi,
                functionName: "getProposal",
              })) as {
                addr: Address;
                status: string;
                remoteCid: string;
                balanceYes: bigint;
                balanceNo: bigint;
                goalAchieved: boolean;
              };

              let proposalMetadata: any = {};
              fetch(
                `https://gateway.lighthouse.storage/ipfs/${proposal.remoteCid}/`
              )
                .then((response: Response) => {
                  if (response.ok) return (proposalMetadata = response.json());
                  throw new Error("Network response was not ok.");
                })
                .catch((error: Error) => {
                  console.error("Failed to save the file:", error);
                });

              return {
                ...proposal,
                title: proposalMetadata.title,
                overview: proposalMetadata.overview,
                rules: proposalMetadata.rules,
                externalLink: proposalMetadata.externalLink,
              } as Proposal;
            })
          );

          return {
            ...goal,
            title: goalMetadata.title,
            overview: goalMetadata.overview,
            rules: goalMetadata.rules,
            externalLink: goalMetadata.externalLink,
            proposals: proposals,
            currentProposal: "0x",
            goalValue: 0,
            votingDeadline: 0,
            goalMaturity: 0,
          } as Goal;
        })
      );
      setGoals(goals);
    };

    const intervalID = setInterval(fetchGoals, 10000);

    return () => {
      clearInterval(intervalID);
    };
  }, [contractAddress]);

  const createGoal = async (
    cid: string,
    goalValue: bigint,
    votingDeadline: bigint,
    goalMaturity: bigint
  ) => {
    try {
      const { hash } = await writeContract({
        address: contractAddress as Address,
        abi: governanceAbi,
        functionName: "createGoal",
        args: [cid, goalMaturity, goalValue, votingDeadline, true],
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
    console.log("Creating proposal for" + goalAddress);
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
