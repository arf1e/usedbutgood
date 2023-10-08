import { Box, Grid, Skeleton, styled } from '@mui/material';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import {
  PRODUCTS_PER_PAGE,
  selectFilters,
  selectProducts,
} from '../slices/productsSlice';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

const ProductsListContainer = styled(Box)``;

export default function ProductList() {
  const filters = useSelector((state: RootState) =>
    selectFilters(state.products)
  );
  const { error, isLoading } = useGetAllProductsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });
  const products = useSelector((state: RootState) =>
    selectProducts(state.products)
  );

  const renderSkeletons = useMemo(() => {
    return new Array(PRODUCTS_PER_PAGE).fill(null).map((_, index) => (
      <Grid key={index} item xs={6} sm={4} md={3}>
        <ProductCardSkeleton />
      </Grid>
    ));
  }, []);

  return (
    <ProductsListContainer>
      <Grid container columns={12} spacing={2}>
        {isLoading && renderSkeletons}
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={4} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </ProductsListContainer>
  );
}
