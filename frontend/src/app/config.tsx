import { config } from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
config();

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const WALLETCONNECT_KEY = process.env.NEXT_PUBLIC_WALLETCONNECT_KEY;
export const GOVERNANCE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS;
export const FROM_BLOCK = process.env.NEXT_PUBLIC_FROM_BLOCK;
export const IPFS_API_KEY = process.env.IPFS_API_KEY;
