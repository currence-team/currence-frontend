import { Market, Outcome } from '@/typings';
import { atom } from 'recoil';

type TradeModalState =
  | { active: true; market: Market; outcome?: Outcome }
  | { active: false; market?: Market; outcome?: Outcome };

export const tradeModalState = atom<TradeModalState>({
  key: 'modal-provider-state',
  default: { active: false },
});
