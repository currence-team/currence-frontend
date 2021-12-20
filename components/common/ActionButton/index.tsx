import tw, { css, styled } from 'twin.macro';

import { ButtonProps } from '@/typings';
import { range } from '@/lib/util';

const LoadingDot = tw.div`rounded-full bg-white w-1 h-1 animate-ping`;
const Loading: React.FC = (props) => {
  const step = 0.1;

  return (
    <div {...props} tw="flex space-x-3">
      {range(3).map((n) => (
        <LoadingDot
          key={n}
          css={css`
            animation-delay: ${step * (n + 1)}s;
          `}
        />
      ))}
    </div>
  );
};

type BaseButtonProps = { kind: 'cancel' | 'confirm'; loading?: boolean };
const BaseButton = styled.button<BaseButtonProps>(({ kind, loading }) => [
  tw`pb-2 pt-[0.65rem] font-mono text-sm`, // padding hack due to font weirdness
  tw`mt-2 w-full border border-black transition`,
  kind === 'cancel'
    ? tw`text-black hover:bg-gray-100`
    : loading
    ? tw`text-white bg-blue-600`
    : tw`text-white bg-blue-700 hover:bg-blue-600`,
]);

const ActionButton: React.FC<ButtonProps & BaseButtonProps> = ({
  children,
  ...props
}) => {
  const { loading } = props;
  return (
    <BaseButton {...props} tw="relative">
      {/* this absolute stuff is so the button doesn't change size when we show
      the loader */}
      <span css={loading && tw`invisible`}>{children}</span>
      {loading && (
        <Loading tw="absolute inset-0 flex items-center justify-center" />
      )}
    </BaseButton>
  );
};

export default ActionButton;
