import { currenceContract } from '../contract';
import { useWallet } from './useWallet';

export const useContract = () => {
  const { wallet } = useWallet();
  const contract = currenceContract(wallet);

  return { contract };
};
