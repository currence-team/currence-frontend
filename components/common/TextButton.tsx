import tw, { styled } from 'twin.macro';

import commonStyles from '@/styles/common';

const TextButton = styled.button(({ disabled }) => [
  disabled ? tw`cursor-default` : commonStyles.link,
]);

export default TextButton;
