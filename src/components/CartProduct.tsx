import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CartProductContainer from '../styled/CartProductContainer';
import { CartProductType } from '../types/cart';
import CartControls from './CartControls';

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
