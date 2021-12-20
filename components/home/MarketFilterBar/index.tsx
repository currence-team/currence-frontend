import tw, { styled } from 'twin.macro';
import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

const Wrapper = tw.div`flex items-center justify-between font-primary`;

const FilterButton = styled.button(() => [
  tw`flex items-center rounded-md px-2 pt-1 hover:underline transition space-x-1`,
]);

const DirectionFilter: React.FC<{
  active?: boolean;
  onClick?: () => unknown;
}> = ({ active, children, ...props }) => {
  return (
    <FilterButton {...props}>
      <span>{children}</span>
      <span tw="pb-0.5">
        <FaArrowDown
          css={[tw`text-xs transform transition`, active ? '' : tw`rotate-180`]}
        />
      </span>
    </FilterButton>
  );
};

const ToggleFilter: React.FC<{
  active?: boolean;
  text: string;
  onClick: () => unknown;
}> = ({ active, text, ...props }) => {
  return (
    <FilterButton {...props}>
      {active ? (
        <span>{text}</span>
      ) : (
        <span>
          <s>{text}</s>
        </span>
      )}
    </FilterButton>
  );
};

const MarketFilterBar: React.FC = () => {
  const [byVolume, setByVolume] = useState(true);
  const [byDate, setByDate] = useState(true);
  const [showResolved, setShowResolved] = useState(false);
  return (
    <Wrapper>
      <DirectionFilter active={byVolume} onClick={() => setByVolume(!byVolume)}>
        Volume
      </DirectionFilter>
      <DirectionFilter active={byDate} onClick={() => setByDate(!byDate)}>
        End date
      </DirectionFilter>
      <ToggleFilter
        text="Show resolved"
        active={showResolved}
        onClick={() => setShowResolved(!showResolved)}
      />
    </Wrapper>
  );
};

export default MarketFilterBar;
