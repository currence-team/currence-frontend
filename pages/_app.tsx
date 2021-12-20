import React, { ReactElement, ReactNode } from 'react';
import { GlobalStyles } from 'twin.macro';
import { RecoilRoot } from 'recoil';

import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NearProvider from '@/hooks/useNear';
import WalletProvider from '@/hooks/useWallet';
import PasswordProtectedLayout from '@/components/layouts/PasswordProtectedLayout';
import TradeModalProvider from '@/components/home/TradeModal/TradeModalProvider';
import { IS_PRODUCTION } from '@/config';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getPageLayout = Component.getLayout ?? ((page) => page);

  return (
    <React.Fragment>
      <GlobalStyles />
      <RecoilRoot>
        <PasswordProtectedLayout enabled={!IS_PRODUCTION} password="tymikeson">
          <NearProvider>
            <WalletProvider>
              <TradeModalProvider>
                {getPageLayout(<Component {...pageProps} />)}
                <ToastContainer />
              </TradeModalProvider>
            </WalletProvider>
          </NearProvider>
        </PasswordProtectedLayout>
      </RecoilRoot>
    </React.Fragment>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
