import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';

import ActionButton from '@/components/common/ActionButton';
import TextButton from '@/components/common/TextButton';
import { useWallet } from '@/hooks/useWallet';
import { ButtonProps, InputProps, Market, Outcome } from '@/typings';

type Balance = number;

interface Token {
  symbol: string;
  balance: Balance;
}

interface SwapInputProps {
  onChange: (v: number) => unknown;
  token: Token;
  balance: Balance;
  inputProps?: InputProps;
}

// kind of a hack so we can pass tw to the SwapInput
const SwapInputWrapper = styled.div(
  tw`flex items-center justify-between border border-black p-2 pr-3 text-gray-800 font-mono`
);
const SwapInput: React.FC<SwapInputProps> = ({
  token,
  balance: _balance,
  onChange,
  inputProps,
  ...props
}) => {
  const balance = (_balance / 100).toFixed(2);
  const [swapAmount, setSwapAmount] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = parseInt(e.target.value);
    setSwapAmount(v);
    onChange(v);
  };

  return (
    <SwapInputWrapper {...props}>
      <div>
        <TextButton>{token.symbol}</TextButton>
        <div tw="text-xs">
          <span tw="whitespace-nowrap">Balance: {balance}</span>
        </div>
      </div>
      <input
        tw="outline-none appearance-none text-xl text-right min-w-0"
        placeholder="0.0"
        {...inputProps}
        onChange={handleChange}
      />
    </SwapInputWrapper>
  );
};

const UnoReverseButton: React.FC<ButtonProps> = (props) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (props.onClick) {
      /* @ts-ignore */
      props.onClick();
    }
    setActive(false);
  };

  return (
    <button
      {...props}
      className="group"
      css={[
        tw`absolute m-auto inset-0 h-8 w-8 rounded-full bg-white border border-black flex flex-col items-center justify-center text-sm transition`,
        active && tw`bg-blue-600`,
      ]}
      onClick={handleClick}
      onMouseMove={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span
        css={[
          tw`transform transition duration-300`,
          active && tw`rotate-180 text-white`,
        ]}
      >
        &darr;
      </span>
    </button>
  );
};

const LineItem: React.FC<{
  left: React.ReactChild;
  right: React.ReactChild;
}> = ({ left, right, ...props }) => {
  return (
    <div {...props} tw="font-primary text-xs flex items-center justify-between">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

const TradeCard: React.FC<{
  market: Market;
  outcome: Outcome;
  onCancel?: () => unknown;
  cancelText?: string;
}> = ({ market, outcome, onCancel, cancelText, ...props }) => {
  const baseToken: Token = { symbol: 'USDC', balance: 138412 };
  const quoteToken: Token = { symbol: outcome.short_name, balance: 0 };
  const [[fromToken, toToken], setSwapTokens] = useState([
    baseToken,
    quoteToken,
  ]);

  const handleClickUnoReverse = () => {
    setSwapTokens([toToken, fromToken]);
  };

  const { wallet } = useWallet();

  const [loading, setLoading] = useState(false);
  const isSignedIn = wallet.isSignedIn();
  const handleClickConfirm = async () => {
    setLoading(true);
    try {
      if (!isSignedIn) {
        await wallet.requestSignIn();
      } else {
        const accountId = wallet.getAccountId();
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
  };

  const { short_name, price } = outcome;
  const { trade_fee_bps } = market;

  return (
    <div {...props}>
      <h1 tw="font-primary">{outcome.long_name}</h1>

      <div tw="mt-1 relative">
        <SwapInput
          token={fromToken}
          balance={fromToken.balance}
          onChange={(v) => console.log({ v })}
          inputProps={{ placeholder: '0.0' }}
        />
        <SwapInput
          tw="mt-2"
          token={toToken}
          balance={toToken.balance}
          onChange={(v) => console.log({ v })}
          inputProps={{ placeholder: '0.0' }}
        />
        <UnoReverseButton onClick={handleClickUnoReverse} />
      </div>

      <LineItem
        tw="mt-2"
        left="Average cost"
        right={`1 ${short_name} = 0.${price}`}
      />
      <LineItem left="Fee" right={`0.${trade_fee_bps}%`} />
      <p tw="mt-2 text-xs">
        You are buying {short_name} at an average cost of $0.{price} USDC per
        share. You believe there is at least an {price}% chance that this will
        be outcome of the event.
      </p>

      <ActionButton
        tw="mt-2"
        kind="confirm"
        onClick={handleClickConfirm}
        loading={loading}
      >
        {isSignedIn ? 'Place order' : 'Sign in'}
      </ActionButton>
      {onCancel && (
        <ActionButton tw="mt-2" kind="cancel" onClick={onCancel}>
          {cancelText || 'Cancel'}
        </ActionButton>
      )}
    </div>
  );
};

export default TradeCard;
