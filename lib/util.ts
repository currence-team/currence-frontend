import { ConnectConfig, keyStores } from 'near-api-js';
import { NEAR_CONFIG } from '@/config';

export const range = (n: number) => [...new Array(n).keys()];

export const getNearConnectConfig = (): ConnectConfig => ({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  ...NEAR_CONFIG,
});

/**
 * Truncate the identifying part of the account ID. If it incldues a suffix like
 * .near or .testnet, truncates the part before that
 *
 * Example
 *
 * 123456789.testnet, 8 => 123...789.testnet
 *
 */
export const truncAccountId = (s: string, maxLen: number) => {
  const [suffix, ...prefix] = s.split('.').reverse();
  const toTrunc = prefix.length === 0 ? suffix : prefix.reverse().join('.');
  const end = prefix.length === 0 ? '' : '.' + suffix;
  // 0 length 'prefix' in this case means there was no suffix (because
  // 'abc'.split('.').reverse() --> ['abc'], prefix would be [])

  // account for the ellipsis
  // if "truncating" actually makes the string longer, there's no point
  if (toTrunc.length < maxLen + 1) {
    return s;
  }

  // take as much of the start as possible
  const start = toTrunc.slice(0, maxLen - 4);
  return start + '...' + toTrunc.slice(-3) + end;
};
