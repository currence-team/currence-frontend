import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Near, WalletConnection } from 'near-api-js';

import { walletState } from '@/state/near';
import { useNear } from './useNear';

// hack due to next, see state/near.ts
const defaultWallet = (near: Near) => {
  return new WalletConnection(near, null);
};

/**
 * WalletProvider injects a Near connection.
 *
 * Why is this a provider? The Near wallet /connection/ doesn't require user
 * interaction, only signin does. Rather than manually calling connect
 * everywhere, we connect immediately in a provider, and make signin manual
 */
const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useRecoilState(walletState);
  const resetWallet = useResetRecoilState(walletState);
  const { near } = useNear();

  useEffect(() => {
    if (!near) {
      return;
    }
    setWallet(defaultWallet(near));

    return resetWallet;
  }, [near]);

  // see state/near.ts
  return <React.Fragment>{near && wallet && children}</React.Fragment>;
};

export const useWallet = () => {
  const { near } = useNear();
  const [wallet, setWallet] = useRecoilState(walletState);

  const signOut = () => {
    wallet.signOut();
    setWallet(defaultWallet(near));
  };

  return {
    wallet, // see note in state/near.ts
    signOut,
  };
};

export default WalletProvider;
