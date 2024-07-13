import { config } from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
config();

export const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
export const WALLETCONNECT_KEY = process.env.NEXT_PUBLIC_WALLETCONNECT_KEY;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const ABI = process.env.ABI;