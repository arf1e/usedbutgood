import { DeleteOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  useTheme,
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
import composeBackgroundColor from '../utils/composeBackgroundColor';
import CategoryBadge from './CategoryBadge';

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
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
  const theme = useTheme();

  const renderAddToCartButton = useMemo(() => {
    return (
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={handleAddToCart}
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
          size="small"
          aria-label="small button group"
        >
          <Button sx={{}} onClick={handleDecrement}>
            -
          </Button>
          <Button disabled>
            <Typography variant="body2" color="text.primary">
              {itemQty}
            </Typography>
          </Button>
          <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
        <IconButton color="error" size="small" onClick={handleClear}>
          <DeleteOutlined />
        </IconButton>
      </Box>
    );
  }, [itemQty, handleIncrement, handleDecrement, handleClear]);
  return (
    <Card
      sx={{
        bgcolor: composeBackgroundColor(theme),
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <Box display="flex" sx={{ mb: 1 }}>
          <CategoryBadge size="small" category={product.category} />
        </Box>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">
          {product.description.slice(0, 140)}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
          ${itemQty === 0 ? `${product.price}` : `${itemQty * product.price}`}
        </Typography>
        {itemQty > 1 && (
          <Typography variant="caption">
            – total of ${product.price} x {itemQty}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {itemQty === 0 && renderAddToCartButton}
        {itemQty > 0 && renderQuantityControls}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
