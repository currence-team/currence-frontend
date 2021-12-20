import React from 'react';
import { useRecoilValue } from 'recoil';

import TradeModal from '.';
import { tradeModalState } from './state';

const TradeModalProvider: React.FC = ({ children }) => {
  const state = useRecoilValue(tradeModalState);

  return (
    <React.Fragment>
      {children}
      {state.active && (
        <TradeModal market={state.market} initialOutcome={state.outcome} />
      )}
    </React.Fragment>
  );
};

export default TradeModalProvider;
