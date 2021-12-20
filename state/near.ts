import { atom, selector } from 'recoil';
import { Near, WalletConnection } from 'near-api-js';

// NB: due to next SSR, we can't use a promise for the default value.
// This is because the keystore depends on localstorage, which isn't available
// in Node in dev (even with dynamic imports, there's no way to turn off SSR
// everywhere in dev). You can avoid this by using react-router directly.
export const nearState = atom<Near>({
  key: 'near-connection-state',
  default: undefined as any, // runtime error is prevented by provider
  dangerouslyAllowMutability: true,
});

// the default value here would probably need to be an async selector
export const walletState = atom<WalletConnection>({
  key: 'near-wallet-state',
  default: undefined as any, // runtime error is prevented by provider
  dangerouslyAllowMutability: true,
});

export const isSignedInShim = selector<boolean>({
  key: 'near-wallet-is-signed-in-selector',
  get: ({ get }) => {
    return get(walletState).isSignedIn();
  },
});
