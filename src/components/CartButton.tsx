import { ShoppingBagOutlined } from '@mui/icons-material';
import { Badge, IconButton, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCartOverlay from '../hooks/useCartOverlay';
import { RootState } from '../slices';
import { selectTotalQuantity } from '../slices/cartSlice';

export default function CartButton() {
  const itemsInCart = useSelector((state: RootState) =>
    selectTotalQuantity(state.cart)
  );
  const { showCartOverlay } = useCartOverlay();
  const theme = useTheme();
  const badgeColor = useMemo(
    () => (itemsInCart > 0 ? 'primary' : 'default'),
    [itemsInCart]
  );
  return (
    <IconButton onClick={showCartOverlay}>
      <Badge badgeContent={itemsInCart} showZero color={badgeColor}>
        <ShoppingBagOutlined sx={{ color: theme.palette.primary.main }} />
      </Badge>
    </IconButton>
  );
}
