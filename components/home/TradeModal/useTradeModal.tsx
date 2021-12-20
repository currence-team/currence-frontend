import { Market, Outcome } from '@/typings';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { tradeModalState } from './state';

const useTradeModal = () => {
  const setState = useSetRecoilState(tradeModalState);
  const hideTrade = useResetRecoilState(tradeModalState);

  const showTrade = (market: Market, outcome?: Outcome) => {
    setState({ active: true, market, outcome });
  };

  return {
    showTrade,
    hideTrade,
  };
};

export default useTradeModal;
