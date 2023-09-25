import { ShoppingBagOutlined } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import useCartOverlay from '../hooks/useCartOverlay';
import { RootState } from '../slices';
import { selectTotalQuantity } from '../slices/cartSlice';

export default function CartButton() {
  const itemsInCart = useSelector((state: RootState) =>
    selectTotalQuantity(state.cart)
  );
  const { showCartOverlay } = useCartOverlay();
  return (
    <IconButton onClick={showCartOverlay}>
      <Badge badgeContent={itemsInCart} showZero color="secondary">
        <ShoppingBagOutlined />
      </Badge>
    </IconButton>
  );
}
