import { useParams } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address, parseAbiItem } from "viem";
import { GOVERNANCE_CONTRACT_ADDRESS } from "../app/config";

// Abis
import { abi as governanceAbi } from "../abi/FutarchyGovernance.json";
import { abi as goalAbi } from "../abi/FutarchyGoal.json";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { waitForTransaction, writeContract } from "wagmi/actions";
import { ToastType } from "@/components/ToastGpt";
import { useNotification } from "./NotificationContext";

type FutarchyContextProps = {
  contractAddress: Address;
  isOwner: boolean;
  goals: Array<Goal>;
  createGoal(
    description: string,
    goalValue: number,
    votingDeadline: number,
    goalMaturity: number
  ): void;
};

const FutarchyContext = createContext<FutarchyContextProps>({
  contractAddress: "0x" as Address,
  isOwner: false,
  goals: [],
  createGoal: () => {},
});

export type Goal = {
  address: Address;
  description: string;
  votingDeadline: number;
  proposals: string[];
  currentProposal: Address;
  goalMaturity: number;
  goalValue: number;
};

export const FutarchyProvider = ({ children }: PropsWithChildren) => {
  const contractAddress = GOVERNANCE_CONTRACT_ADDRESS as Address;
  console.log(`layout contractAddress ${contractAddress}`);

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
            addr: string;
            remoteCid: string;
            proposals: Array<string>;
            startTime: bigint;
          };

          return {
            address: goal.addr,
            description: goal.remoteCid,
            proposals: goal.proposals,
            startTime: goal.startTime,
            currentProposal: "0x",
            goalValue: 0,
            votingDeadline: 0,
            goalMaturity: 0,
          } as Goal;
        })
      );
      setGoals(goals);
    };

    const intervalID = setInterval(fetchGoals, 3000);

    return () => {
      clearInterval(intervalID);
    };
  }, [contractAddress]);

  const createGoal = async (
    description: string,
    goalValue: number,
    votingDeadline: number,
    goalMaturity: number
  ) => {
    try {
      const { hash } = await writeContract({
        address: contractAddress as Address,
        abi: governanceAbi,
        functionName: "createGoal",
        args: [description, goalMaturity, goalValue, votingDeadline, true],
      });

      await waitForTransaction({ hash });
      showNotification("Voter registered", ToastType.SUCCESS);
    } catch (error) {
      showNotification("This address is already registered", ToastType.ERROR);
    }
  };

  return (
    <FutarchyContext.Provider
      value={{ contractAddress, isOwner, goals, createGoal }}
    >
      {children}
    </FutarchyContext.Provider>
  );
};

export function useFutarchy() {
  return useContext(FutarchyContext);
}
