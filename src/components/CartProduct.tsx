import { Box, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartProductType } from '../types/cart';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import CartControls from './CartControls';

const CartProductContainer = styled(Box)`
  padding: 2em;
  min-height: 4em;
  border-radius: 1em;
  background: ${({ theme }) => composeBackgroundColor(theme)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em 0;

  .product-title {
    font-weight: 500;
    transition: 0.2s;
    color: ${({ theme }) => theme.palette.primary.main};

    &:hover {
      color: ${({ theme }) => theme.palette.primary.dark};
    }
  }

  .primary-info {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: flex-start;
  }

  .price-calc {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    align-items: center;
  }
`;

type CartProductProps = CartProductType & { handleCloseCart: () => void };

export default function CartProduct({
  product,
  quantity,
  handleCloseCart,
}: CartProductProps) {
  return (
    <CartProductContainer key={product.id}>
      <Box className="primary-info">
        <Link
          to={`/product/${product.id}`}
          onClick={handleCloseCart}
          style={{ textDecoration: 'none' }}
        >
          <Typography variant="h5" className="product-title">
            {product.title}
          </Typography>
        </Link>
      </Box>
      <Box className="price-calc">
        <Typography variant="h6">${product.price * quantity}</Typography>
        {quantity > 1 && (
          <Typography variant="caption">
            – total of ${product.price} x ${quantity}
          </Typography>
        )}
      </Box>
      <Box className="cart-controls">
        <CartControls product={product} size="large" />
      </Box>
    </CartProductContainer>
  );
}
