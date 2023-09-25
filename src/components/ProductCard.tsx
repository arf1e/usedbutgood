import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { ProductType } from '../types/product';

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  return (
    <Card sx={{ backgroundColor: 'azure', maxWidth: 320 }}>
      <CardActionArea onClick={() => alert('salam')}>
        <CardMedia
          component="img"
          sx={{ objectFit: 'contain' }}
          height={120}
          image={product.images[0]}
          alt={product.title}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Button variant="contained" fullWidth onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
