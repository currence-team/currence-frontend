import { atom } from 'recoil';
import { UserBalances } from '../typings';

const balancesState = atom<UserBalances>({
  key: 'balancesState',
  default: [],
});
