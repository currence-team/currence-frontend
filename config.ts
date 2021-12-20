import { ConnectConfig } from 'near-api-js';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// NB: you can't destructure from next env
export const API_BASE_URL =
  process.env.API_BASE_URL || 'http://localhost:8000/api';

export const CONTRACT_ACCOUNT =
  process.env.CONTRACT_ACCOUNT || 'dev-1640645034057-42714782643150';

/* @ts-ignore */
export const NEAR_CONFIG: ConnectConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
};
