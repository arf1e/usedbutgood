import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const ProductInfoContainer = styled(Box)`
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
  display: flex;
  padding: 2em;
  border-radius: 1em;
  flex-direction: column;
  align-items: flex-start;
`;

export default ProductInfoContainer;
