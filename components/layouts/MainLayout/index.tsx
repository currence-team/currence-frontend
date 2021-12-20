import { useOnScroll } from '@/hooks/useOnScroll';
import { useWallet } from '@/hooks/useWallet';
import { truncAccountId } from '@/lib/util';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import tw from 'twin.macro';

const WalletConnectionButton = () => {
  const { wallet, signOut } = useWallet();
  const isSignedIn = wallet.isSignedIn();
  const [text, setText] = useState('Connect wallet');

  useEffect(() => {
    if (isSignedIn) {
      const accountId = wallet.getAccountId();
      setText(truncAccountId(accountId, 12));
    }
  }, [wallet]);

  const handleSignIn = () => {
    wallet.requestSignIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div
      className="group"
      tw="relative z-30 font-primary font-bold text-lg sm:text-base"
    >
      {isSignedIn ? (
        <React.Fragment>
          <div
            css={[
              tw`absolute top-2 right-0 p-2`,
              tw`bg-white shadow-lg border border-black`,
              tw`transform opacity-0 transition invisible group-hover:(opacity-100 visible flex flex-col items-stretch)`,
            ]}
          >
            <p tw="cursor-default font-primary font-bold">{text}</p>
            <div>
              <button tw="hover:underline" onClick={handleSignOut}>
                Log out
              </button>
            </div>
          </div>
          <span>{text}</span>
        </React.Fragment>
      ) : (
        <button
          tw="font-primary text-sm bg-green-500 text-white shadow-hard-xs transition hover:(bg-green-400) border border-black pt-1 px-1.5"
          onClick={handleSignIn}
        >
          Connect wallet
        </button>
      )}
    </div>
  );
};

const NetworkSelectButton: React.FC = () => {
  return (
    <div tw="space-x-0.5 flex items-center">
      <span tw="font-primary font-bold cursor-not-allowed">Devnet</span>
      <FaCaretDown tw="pb-0.5" />
    </div>
  );
};

const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <a tw="font-primary text-xl font-bold">currence</a>
    </Link>
  );
};

const TopBar: React.FC = (props) => {
  const [showBorder, setShowBorder] = useState(false);

  useOnScroll((y) => {
    if (y > 15) {
      if (!showBorder) {
        setShowBorder(true);
      }
    } else {
      setShowBorder(false);
    }
  });

  return (
    <header
      {...props}
      css={[
        tw`border-b bg-white transition`,
        showBorder ? tw`border-black shadow` : tw`border-transparent shadow-sm`,
      ]}
    >
      <div tw="p-4 pb-3 grid grid-cols-2 sm:grid-cols-3 max-w-5xl mx-auto">
        <Logo />
        <div tw="hidden sm:block justify-self-center">
          <NetworkSelectButton />
        </div>
        <div tw="justify-self-end">
          <WalletConnectionButton />
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = (props) => {
  return (
    <footer tw="bg-black h-36" {...props}>
      <div tw="max-w-5xl mx-auto p-4 md:(flex justify-between)">
        <section>
          <p>
            <a
              href="/"
              tw="font-mono text-sm text-gray-200 transition hover:text-white"
            >
              currence
            </a>
          </p>
        </section>
        <section>
          <p>hello</p>
        </section>
      </div>
    </footer>
  );
};

const Wrapper = tw.div`flex-grow flex flex-col items-center px-4 mx-auto w-full max-w-5xl pb-20`;

const MainLayout: React.FC = ({ children }) => {
  return (
    <div tw="min-h-screen w-screen flex flex-col bg-gray-50">
      <TopBar tw="sticky top-0 z-50" />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </div>
  );
};

export default MainLayout;
