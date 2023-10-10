import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

const CartSumContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  border-radius: 1em;
  margin-bottom: 2em;
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
`;

export default CartSumContainer;
