import { Box, Button, Collapse, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { RootState } from '../slices';
import { selectCartItems } from '../slices/cartSlice';
import CartProduct from './CartProduct';
import CartSum from './CartSum';

type CartListProps = {
  handleCloseCart: () => void;
};

export default function CartItemsList({ handleCloseCart }: CartListProps) {
  const cartProducts = useSelector((state: RootState) =>
    selectCartItems(state.cart)
  );
  const navigate = useNavigate();
  const handleEmptyCartButtonClick = () => {
    handleCloseCart();
    navigate('/');
  };
  if (cartProducts.length === 0) {
    return (
      <Box
        sx={{
          paddingY: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ fontSize: 64 }}
        >
          🤷
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary">
          Nothing in your cart at the moment. <br /> We hope you'll find
          something you like in our catalog.
        </Typography>
        <Button
          onClick={handleEmptyCartButtonClick}
          variant="text"
          color="primary"
        >
          Ok, take me there!
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingY: 4,
      }}
    >
      <CartSum />
      <TransitionGroup>
        {cartProducts.map((cartProduct) => (
          <Collapse key={cartProduct.product.id}>
            <CartProduct {...cartProduct} handleCloseCart={handleCloseCart} />
          </Collapse>
        ))}
      </TransitionGroup>
    </Box>
  );
}
