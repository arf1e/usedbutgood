import { styled, Box } from '@mui/material';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const ProductsFilterContainer = styled(Box)`
  background: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 8px;
  display: flex;
  padding: 1em;
  flex-direction: column;
  margin: 0;

  form {
    display: flex;
    flex-direction: column;
  }

  .price-range {
    display: flex;
    gap: 1em;
  }
`;

export default ProductsFilterContainer;
