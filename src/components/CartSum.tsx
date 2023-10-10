import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import {
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from '../slices/cartSlice';
import CartSumContainer from '../styles/styled/CartSumContainer';

export default function CartSum() {
  const dispatch = useDispatch();

  const totalItems = useSelector((state: RootState) =>
    selectTotalQuantity(state.cart)
  );

  const totalPrice = useSelector((state: RootState) =>
    selectTotalPrice(state.cart)
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <CartSumContainer>
      <Typography
        variant="h5"
        sx={{ fontWeight: 500 }}
        className="quantity-price"
      >
        Total items: {totalItems}
      </Typography>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShoppingCartCheckoutOutlined />}
        >
          Proceed to checkout (${totalPrice})
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ ml: 4 }}
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </Box>
    </CartSumContainer>
  );
}
