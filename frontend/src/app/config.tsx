import { config } from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
config();

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const WALLETCONNECT_KEY = process.env.NEXT_PUBLIC_WALLETCONNECT_KEY;
export const GOVERNANCE_CONTRACT_ADDRESS = process.env.GOVERNANCE_CONTRACT_ADDRESS;
export const GOVERNANCE_CONTRACT_ABI = process.env.GOVERNANCE_CONTRACT_ABI;
export const GOAL_CONTRACT_ABI = process.env.GOAL_CONTRACT_ABI;