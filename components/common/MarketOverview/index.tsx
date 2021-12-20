import TextButton from '@/components/common/TextButton';
import { Market, MarketViewComponent, Outcome } from '@/typings';
import { format } from 'date-fns';
import React from 'react';
import tw, { styled } from 'twin.macro';
import OutcomeBar from './OutcomeBar';

const BaseLineItem = styled.div(
  tw`font-primary text-xs flex items-center justify-between`
);
const LineItem: React.FC<{ label: string; content: string }> = ({
  label,
  content,
  ...props
}) => {
  return (
    <BaseLineItem {...props}>
      <span>{label}</span>
      <span>{content}</span>
    </BaseLineItem>
  );
};

const ResolutionLineItem: React.FC<{
  isResolved: boolean;
  timestamp: number;
}> = ({ isResolved, timestamp, ...props }) => {
  const label = isResolved ? 'Resolved' : 'Resolves';
  let date = new Date(timestamp / 1000000);
  if (isNaN(date.getTime())) {
    date = new Date();
  }
  const content = format(date, `MMMM dd, yyyy`);
  return <LineItem {...props} label={label} content={content} />;
};

const MarketOverview: MarketViewComponent<{
  onClickMarket?: (m: Market) => unknown;
  onClickOutcome?: (o: Outcome) => unknown;
}> = ({ market, onClickOutcome, onClickMarket }) => {
  const volume = market.shares.reduce((a, b) => a + b, 0).toFixed(2);

  const isResolved = market.stage === 'Finalized';
  const resolutionMetaTimestamp = isResolved
    ? market.resolution_time
    : market.end_time;

  const handleClickMarket = () => {
    if (onClickMarket) {
      onClickMarket(market);
    }
  };

  const handleClickOutcome = (o: Outcome) => {
    if (onClickOutcome) {
      onClickOutcome(o);
    }
  };

  return (
    <React.Fragment>
      <header tw="font-primary">
        <TextButton tw="text-left" onClick={handleClickMarket}>
          {market.title}
        </TextButton>
      </header>

      <section tw="mt-1 space-y-2 font-mono">
        {market.outcomes.map((outcome) => {
          return (
            <OutcomeBar
              key={outcome.short_name}
              outcome={outcome}
              isMarketResolved={isResolved}
              onClick={() => handleClickOutcome(outcome)}
            />
          );
        })}
      </section>

      <ResolutionLineItem
        tw="mt-2"
        isResolved={isResolved}
        timestamp={resolutionMetaTimestamp}
      />
      <LineItem label="Volume" content={`${volume} USDC`} />
      {/* <LineItem label="Liquidity" content={`${liquidity} USDC`} /> */}
    </React.Fragment>
  );
};

export default MarketOverview;
