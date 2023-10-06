import { useSelector } from 'react-redux';
import { RootState } from '../slices';
import { selectCartItems } from '../slices/cartSlice';

export default function CartItems() {
  const items = useSelector((state: RootState) => selectCartItems(state.cart));
  return <></>;
}
