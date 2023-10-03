import { Box, styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { ProductType } from '../types/product';
import CategoryBadge from './CategoryBadge';

type Props = {
  product: ProductType;
};

const ProductCardContainer = styled(Box)<{ image: string }>`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme, image }) =>
    `url(${image}), linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`};
  .preview {
    width: 80px;
    height: 80px;
    background: ${({ theme }) => theme.palette.primary.light};
    border-radius: 50%;
  }

  .title {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 0.2em;
    text-transform: uppercase;
  }
`;

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
  return (
    <ProductCardContainer component="a" image={product.images[0]}>
      <Box className="details">
        <Typography variant="h6" className="title">
          {product.title}
        </Typography>
        <CategoryBadge category={product.category} size="small" />
        <Typography className="price" variant="body1">
          ${product.price}
        </Typography>
      </Box>
    </ProductCardContainer>
  );
};

export default ProductCard;
