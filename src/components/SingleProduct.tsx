import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../slices';
import { selectItemQuantityInCart } from '../slices/cartSlice';
import Heading from '../styled/Heading';
import ProductInfoContainer from '../styled/ProductInfoContainer';
import { ProductType } from '../types/product';
import CartControls from './CartControls';
import CategoryBadge from './CategoryBadge';
import ProductImagery from './ProductImagery';

type Props = {
  product: ProductType;
};

export default function SingleProduct({ product }: Props) {
  const itemQty = useSelector((state: RootState) =>
    selectItemQuantityInCart(state.cart, product.id)
  );
  return (
    <Container sx={{ mt: 8, minHeight: '100vh' }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} md={6}>
          {product.images.length > 0 && (
            <ProductImagery images={product.images} showsDisclaimer={true} />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductInfoContainer>
            <Heading
              sx={{ marginY: 4, fontSize: '4em' }}
              className="product-title"
              variant="h1"
            >
              {product.title}
            </Heading>
            <CategoryBadge category={product.category} />
            <Typography
              variant="body1"
              sx={{ my: 4, lineHeight: '145%', fontSize: 20 }}
            >
              {product.description}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              $
              {itemQty === 0
                ? `${product.price}`
                : `${itemQty * product.price}`}
            </Typography>
            {itemQty > 1 && (
              <Typography variant="caption" sx={{ fontSize: 16 }}>
                – total of ${product.price} x {itemQty}
              </Typography>
            )}
            <Box sx={{ width: '100%', mt: 4 }}>
              <CartControls size="large" product={product} />
            </Box>
          </ProductInfoContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
