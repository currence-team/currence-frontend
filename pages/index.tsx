import MarketCard from '@/components/home/MarketCard';
import MarketFilterBar from '@/components/home/MarketFilterBar';
import useTradeModal from '@/components/home/TradeModal/useTradeModal';
import MainLayout from '@/components/layouts/MainLayout';
import { useContract } from '@/hooks/useContract';
import { useKeydown } from '@/hooks/useKeydown';
import { useWallet } from '@/hooks/useWallet';
import { range } from '@/lib/util';
import { Market, Outcome } from '@/typings';
import Fuse from 'fuse.js';
import React, { useCallback, useEffect, useState } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import tw, { css, styled } from 'twin.macro';

const marketListState = atom<Market[]>({
  key: 'market-list-state',
  default: [],
});

const marketListFuse = selector<Fuse<Market>>({
  key: 'market-list-fuse-selector',
  get: ({ get }) => {
    return new Fuse(get(marketListState), {
      keys: ['title'],
      shouldSort: false, // TODO: sort functions can go in fuse
    });
  },
});

type SortDirection = 'asc' | 'desc';
const filterOptionsState = atom<{
  showResolved: boolean;
  byDate: SortDirection;
  byVolume: SortDirection;
}>({
  key: 'market-list-filter-options-state',
  default: { showResolved: false, byDate: 'desc', byVolume: 'desc' },
});

const searchQueryState = atom<string>({
  key: 'market-list-query-state',
  default: '',
});

const searchedMarkets = selector<Market[]>({
  key: 'searched-markets-selector',
  get: ({ get }) => {
    const searchQuery = get(searchQueryState);
    if (!searchQuery.length) {
      return get(marketListState);
    }

    const fuse = get(marketListFuse);
    const searchedMarkets = fuse.search(searchQuery);
    return searchedMarkets.map((r) => r.item);
  },
});

const marketListSelector = selector<Market[]>({
  key: 'market-list-selector',
  get: ({ get }) => {
    const filter = get(filterOptionsState);
    const foundMarkets = get(searchedMarkets);

    const test = (m: Market) => {
      return (
        filter.showResolved ||
        (m.stage !== 'Finalized' && m.end_time >= 1641076008000000000)
      );
    };

    return foundMarkets.filter(test);
  },
});

const LoadingDot = tw.div`rounded-full bg-black w-1.5 h-1.5 animate-ping`;
const Loading: React.FC = (props) => {
  const step = 0.07;

  return (
    <div {...props} tw="flex space-x-3">
      {range(4).map((n) => (
        <LoadingDot
          key={n}
          css={css`
            animation-delay: ${step * n}s;
          `}
        />
      ))}
    </div>
  );
};

const Input = styled.input(() => [
  tw`pl-3 pb-2 pt-2.5`,
  tw`font-primary transition`,
  tw`border bg-white border-gray-200 outline-none`,
  tw`hover:(border-gray-300)`,
  tw`focus:(border-black bg-white shadow-hard-xs)`,
]);

const Filters = () => {
  const setSearchQuery = useSetRecoilState(searchQueryState);

  const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <React.Fragment>
      <Input
        tw="lg:col-span-2 rounded-lg"
        placeholder="Search markets"
        onChange={handleSearchInput}
      />
      <MarketFilterBar tw="col-span-1" />
    </React.Fragment>
  );
};

const WelcomeBanner = () => {
  return (
    <div tw="col-span-full p-8 border-2 border-black shadow-lg bg-gray-700 text-white text-center">
      <h1 tw="font-primary font-bold text-2xl">Bet on the future with NEAR.</h1>
      <p tw="mt-4 font-primary text-lg">
        Currence is a prediction market built on the NEAR platform. Learn more{' '}
        <a
          tw="hover:underline font-bold text-green-500"
          href="https://currence-team.gitbook.io/currence/"
          target="_blank"
        >
          here
        </a>
        .
      </p>
      <p tw="font-primary text-lg">
        We intend for this to be a learning resource for anyone developing on
        web3.
      </p>
    </div>
  );
};

const Content = () => {
  const { wallet } = useWallet();
  const { contract } = useContract();

  const [loading, setLoading] = useState(false);
  const setMarkets = useSetRecoilState(marketListState);
  const filteredMarkets = useRecoilValue(marketListSelector);

  const { hideTrade, showTrade } = useTradeModal();
  const handleClickMarket = showTrade;
  const handleClickOutcome = (m: Market, o: Outcome) => showTrade(m, o);

  useKeydown((e) => {
    if (e.key === 'Escape') {
      hideTrade();
    }
  });

  const load = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      const markets = await contract.get_all_markets();
      setMarkets(markets);

      const accountId = wallet.getAccountId();
      // @ts-ignore
      const balances = await contract.get_user_balances({
        account_id: accountId,
      });
    } finally {
      setLoading(false);
    }
  };

  // load markets list
  useEffect(() => {
    load();

    return () => setMarkets([]);
  }, []);

  return (
    <React.Fragment>
      <main tw="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <WelcomeBanner />
        <Filters />
        {loading ? (
          <Loading tw="lg:col-start-2 justify-self-center" />
        ) : (
          filteredMarkets.map((market) => {
            return (
              <div>
                <MarketCard
                  key={market.id}
                  market={market}
                  onClickMarket={handleClickMarket}
                  onClickOutcome={(o) => handleClickOutcome(market, o)}
                />
              </div>
            );
          })
        )}
      </main>
    </React.Fragment>
  );
};

const Wrapper = tw.main`mx-auto flex-grow max-w-5xl`;

const Page = () => {
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  );
};

Page.getLayout = (page: React.ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
