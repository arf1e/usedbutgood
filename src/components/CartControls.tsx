import { DeleteOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectItemQuantityInCart,
} from '../slices/cartSlice';
import { ProductType } from '../types/product';

type Props = {
  product: ProductType;
  size?: 'small' | 'large';
};

export default function CartControls({ product, size = 'small' }: Props) {
  const dispatch = useDispatch();
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ product, quantity: 1 }));
  }, [dispatch, product]);
  const handleIncrement = useCallback(() => {
    dispatch(incrementQuantity(product));
  }, [dispatch, product]);
  const handleDecrement = useCallback(() => {
    dispatch(decrementQuantity(product));
  }, [dispatch, product]);
  const itemQty = useSelector((state: RootState) =>
    selectItemQuantityInCart(state.cart, product.id)
  );
  const handleClear = useCallback(() => {
    dispatch(removeFromCart(product));
  }, [dispatch, product]);

  const renderAddToCartButton = useMemo(() => {
    return (
      <Button
        variant="text"
        color="primary"
        size={size}
        onClick={handleAddToCart}
        startIcon={<ShoppingCartOutlined />}
      >
        Add to cart
      </Button>
    );
  }, []);
  const renderQuantityControls = useMemo(() => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          disableElevation={true}
          size={size}
          aria-label="small button group"
        >
          <Button disabled={itemQty === 1} onClick={handleDecrement}>
            -
          </Button>
          <Button disabled>
            <Typography
              variant={size === 'small' ? 'body2' : 'body1'}
              color="text.primary"
            >
              {itemQty}
            </Typography>
          </Button>
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
        {size === 'small' && (
          <IconButton color="error" size="small" onClick={handleClear}>
            <DeleteOutlined />
          </IconButton>
        )}
        {size === 'large' && (
          <Button
            size={size}
            color="error"
            onClick={handleClear}
            endIcon={<DeleteOutlined />}
          >
            Remove from cart
          </Button>
        )}
      </Box>
    );
  }, [itemQty, handleIncrement, handleDecrement, handleClear]);

  return <>{itemQty === 0 ? renderAddToCartButton : renderQuantityControls}</>;
}
