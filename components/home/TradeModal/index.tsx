import MarketOverview from '@/components/common/MarketOverview';
import TradeCard from '@/components/market/TradeCard';
import { Market, Outcome } from '@/typings';
import { useState } from 'react';
import tw from 'twin.macro';
import useTradeModal from './useTradeModal';

const Container = tw.div`fixed z-50 inset-0`;
const Background = tw.div`absolute inset-0 bg-gray-900 opacity-60 transition`;
const Wrapper = tw.div`relative border border-black bg-white rounded-lg shadow-xl`;

const TradeModal: React.FC<{
  market: Market;
  initialOutcome?: Outcome;
}> = ({ market, initialOutcome, ...props }) => {
  const [outcome, setOutcome] = useState(initialOutcome);
  const { hideTrade } = useTradeModal();

  return (
    <Container {...props} tw="flex items-baseline justify-center pt-[12vh]">
      <Background
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            hideTrade();
          }
        }}
      />
      <Wrapper tw="max-h-[80vh] overflow-y-scroll min-w-[320px]">
        <section tw="max-w-xs p-2.5 ">
          <div
            tw="cursor-pointer hover:underline font-primary text-xs"
            onClick={hideTrade}
          >
            Cancel
          </div>
          <hr tw="my-2" />
          {outcome ? (
            <TradeCard
              market={market}
              outcome={outcome}
              onCancel={() => setOutcome(undefined)}
              cancelText="Back"
            />
          ) : (
            <MarketOverview market={market} onClickOutcome={setOutcome} />
          )}
          <hr tw="mt-2" />
          <h2 tw="mt-2 font-primary">About this market</h2>
          <p tw="font-primary text-xs whitespace-pre-line">
            {market.description}
          </p>
        </section>
        <section></section>
      </Wrapper>
    </Container>
  );
};

export default TradeModal;
