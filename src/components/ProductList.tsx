import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import { selectFilters, selectProducts } from '../slices/productsSlice';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Heading from './Heading';
import ProductCard from './ProductCard';

const ProductsListContainer = styled(Box)``;

export default function ProductList() {
  const filters = useSelector((state: RootState) =>
    selectFilters(state.products)
  );
  const { error, isLoading } = useGetAllProductsQuery(filters);
  const products = useSelector((state: RootState) =>
    selectProducts(state.products)
  );

  return (
    <ProductsListContainer>
      <Grid container columns={12} spacing={1}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </ProductsListContainer>
  );
}
