import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import {
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from '../slices/cartSlice';
import composeBackgroundColor from '../utils/composeBackgroundColor';

const CartSumContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2em;
  border-radius: 1em;
  margin-bottom: 2em;
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
`;

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
