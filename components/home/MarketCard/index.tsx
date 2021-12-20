import MarketOverview from '@/components/common/MarketOverview';
import { useWallet } from '@/hooks/useWallet';
import { Market, Outcome } from '@/typings';
import tw, { styled } from 'twin.macro';

type MarketButtonProps = Pick<Market, 'stage'>;

const MarketButtonBase = styled.button<MarketButtonProps>(({ stage }) => [
  tw`mt-2 w-full py-2 font-mono text-sm text-white border border-black`,
  stage === 'Finalized'
    ? tw`cursor-not-allowed bg-gray-600`
    : tw`bg-blue-700 transition hover:bg-blue-600`,
]);

const MarketActionButton: React.FC<MarketButtonProps> = ({ stage }) => {
  const { wallet } = useWallet();

  const handleClick = () => {
    if (wallet.isSignedIn()) {
      alert('already signed in');
    } else {
      wallet.requestSignIn();
    }
  };

  return (
    <MarketButtonBase className="group" stage={stage} onClick={handleClick}>
      {stage === 'Open' ? (
        <span>
          Connect wallet
          <span tw="ml-0.5 text-transparent font-sans group-hover:text-white transition">
            &rarr;
          </span>
        </span>
      ) : (
        <span>
          Market resolved
          <span tw="font-sans">&nbsp;</span>
        </span>
      )}
    </MarketButtonBase>
  );
};

const Wrapper = tw.div`border border-black rounded-lg bg-white p-2 shadow-hard-xs`;

const MarketCard: React.FC<{
  market: Market;
  showButton?: boolean;
  onClickOutcome?: (o: Outcome) => unknown;
  onClickMarket?: (m: Market) => unknown;
}> = ({ market, showButton, ...props }) => {
  return (
    <Wrapper>
      <MarketOverview market={market} {...props} />
      {showButton && <MarketActionButton stage={market.stage} />}
    </Wrapper>
  );
};

export default MarketCard;
