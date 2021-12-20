export interface Outcome {
  id: number;
  price: number;
  long_name: string;
  short_name: string;
  active: boolean;
  isResolvedOutcome?: boolean;
}

type MarketStage = 'Pending' | 'Open' | 'Paused' | 'Finalized';
export interface Market {
  id: number;
  title: string;
  collateral_decimals: number;
  collateral_token: string;
  deposited_collateral: number;
  description: string;
  end_time: number;
  resolution_time: number;
  minimum_deposit: number;
  trade_fee_bps: number;
  outcomes: Outcome[];
  stage: MarketStage;
  finalizedAt: number;
  shares: number[];

  volume: number;
  liquidity: number;
}

export interface UserBalance {
  market_id: number;
  outcome_id: number;
  shares: number;
}

export type UserBalances = Array<UserBalance>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface MarketViewProps {
  market: Market;
}
export type MarketViewComponent<T = {}> = React.FC<MarketViewProps & T>;
