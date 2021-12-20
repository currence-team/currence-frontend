import { MarketViewComponent } from '@/typings';
import tw from 'twin.macro';
import TradeCard from '../TradeCard';

const Wrapper = tw.div`shadow-hard border border-black p-2`;

const MarketDetails: MarketViewComponent = ({ market, ...props }) => {
  return (
    <Wrapper {...props}>
      <TradeCard market={market} outcome={market.outcomes[0]} />
    </Wrapper>
  );
};

export default MarketDetails;
