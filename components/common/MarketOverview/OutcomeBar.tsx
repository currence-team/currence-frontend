import { Outcome } from '@/typings';
import tw, { css, styled } from 'twin.macro';

const transitionStyles = tw`transition duration-200`;
const activeColors = `border-green-400 bg-green-300`;
const fillStyles = {
  active: tw`${activeColors}`,
  inactive: tw`border-green-300 bg-green-200`,
  disabled: tw`border-gray-300 bg-gray-200`,
};

const Fill = styled.div<{
  active?: boolean;
  disabled?: boolean;
  percentage: number;
}>(({ active, disabled, percentage }) => [
  tw`absolute h-full top-0 bottom-0 border-r`,
  active ? fillStyles.active : fillStyles.inactive,
  disabled && fillStyles.disabled,
  css`
    width: ${percentage}%;
  `,
]);

const Wrapper = styled.a<{ disabled?: boolean }>(({ disabled }) => [
  tw`block relative select-none cursor-pointer`,
  tw`border border-black`,
  !disabled && tw`hover:(shadow-hard-xs bg-green-50)`,
  transitionStyles,
]);

const OutcomeBar: React.FC<{
  outcome: Outcome;
  isMarketResolved: boolean;
  onClick?: () => unknown;
  disabled?: boolean;
}> = ({ outcome, isMarketResolved, disabled, ...props }) => {
  // const percentage = Math.round(outcome.price * 100);
  const percentage = outcome.price;
  const price = outcome.price / 100;

  const showRightText =
    (isMarketResolved && outcome.isResolvedOutcome) || !isMarketResolved;
  const rightText = outcome.isResolvedOutcome
    ? 'Resolved'
    : `$${price.toFixed(2)}`;

  return (
    <Wrapper className="group" disabled={disabled} {...props}>
      <Fill
        css={[!disabled && tw`group-hover:(${activeColors})`, transitionStyles]}
        active={outcome.isResolvedOutcome}
        percentage={outcome.isResolvedOutcome ? 100 : percentage}
        disabled={disabled}
      />
      {/* relative prevents the fill from appearing on top */}
      <div tw="relative flex items-center justify-between p-2 pb-1 font-mono">
        <span>{outcome.short_name}</span>
        {showRightText && <span>{rightText}</span>}
      </div>
    </Wrapper>
  );
};

export default OutcomeBar;
