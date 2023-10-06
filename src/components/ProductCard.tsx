import { DeleteOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../slices';
import { selectItemQuantityInCart } from '../slices/cartSlice';
import { ProductType } from '../types/product';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import CartControls from './CartControls';
import CategoryBadge from './CategoryBadge';

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const itemQty = useSelector((state: RootState) =>
    selectItemQuantityInCart(state.cart, product.id)
  );
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: composeBackgroundColor(theme),
        minHeight: 280,
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <Box display="flex" sx={{ mb: 1 }}>
          <CategoryBadge size="small" category={product.category} />
        </Box>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              lineHeight: '125%',
              transition: '0.2s',
              my: 2,
              '&:hover': {
                color: theme.palette.text.primary,
              },
            }}
          >
            {product.title}
          </Typography>
        </Link>
        <Typography variant="body2">
          {product.description.length > 140
            ? `${product.description.slice(0, 140)}...`
            : product.description}
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
        <CartControls product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
