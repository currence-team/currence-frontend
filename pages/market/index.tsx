import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';

import MarketCard from '@/components/home/MarketCard';
import MainLayout from '@/components/layouts/MainLayout';
import { range } from '@/lib/util';
import { Market } from '@/typings';
import { useContract } from '../../hooks/useContract';

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

const Wrapper = tw.main`max-w-5xl mx-auto`;

const Content = () => {
  const { contract } = useContract();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [market, setMarket] = useState<Market | undefined>();

  const hydrate = async () => {
    // const market = await api?.getMarket({ id: router.query.id as string });
    // @ts-ignore
    const market = await contract.get_market_info({
      market_id: router.query.id,
    });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    console.log({ market });
    setMarket(market);
  };

  useEffect(() => {
    setLoading(true);
    hydrate().finally(() => setLoading(false));
  }, [router.query]);

  return (
    <main tw="flex-grow py-8 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {market ? <MarketCard market={market} showButton /> : <Loading />}
    </main>
  );
};

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
