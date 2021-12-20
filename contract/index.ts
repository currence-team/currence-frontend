import * as nearApi from 'near-api-js';
import { CONTRACT_ACCOUNT } from '../config';

export const currenceContract = (wallet: nearApi.WalletConnection) => {
  const contract = new nearApi.Contract(
    wallet.account(), // the account object that is connecting
    CONTRACT_ACCOUNT,
    {
      viewMethods: ['get_market_info', 'get_all_markets', 'get_user_balances'],
      changeMethods: [
        'create_market',
        'open_market',
        'pause_market',
        'resolve_market',
        'buy',
        'sell',
        'deposit',
        'withdraw_fees',
      ],
      // sender: wallet.getAccountId(), // account object to initialize and sign transactions.
    }
  );
  return contract;
};
