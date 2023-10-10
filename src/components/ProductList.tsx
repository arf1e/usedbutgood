import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import _ from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import {
  PRODUCTS_PER_PAGE,
  selectFilters,
  selectProducts,
} from '../slices/productsSlice';
import CenterContainer from '../styled/CenterContainer';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

const PRODUCTS_LOADING = 'LOADING';
const PRODUCTS_ERROR = 'ERROR';
const PRODUCTS_LIST = 'LIST';
const PRODUCTS_EMPTY = 'EMPTY';

type ProductListState =
  | typeof PRODUCTS_LOADING
  | typeof PRODUCTS_ERROR
  | typeof PRODUCTS_LIST
  | typeof PRODUCTS_EMPTY;

export default function ProductList() {
  const [state, setState] = useState<ProductListState>(PRODUCTS_LOADING);

  const filters = useSelector((state: RootState) =>
    selectFilters(state.products)
  );

  const { isFetching, error } = useGetAllProductsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });
  const products = useSelector((state: RootState) =>
    selectProducts(state.products)
  );

  useEffect(() => {
    if (isFetching) {
      setState(PRODUCTS_LOADING);
      return;
    }

    if (error) {
      setState(PRODUCTS_ERROR);
      return;
    }

    if (products.length === 0) {
      setState(PRODUCTS_EMPTY);
      return;
    }

    setState(PRODUCTS_LIST);
  }, [isFetching, error, products]);

  const renderSkeletons = useMemo(() => {
    return new Array(PRODUCTS_PER_PAGE).fill(null).map((_, index) => (
      <Grid key={index} item xs={6} sm={4} md={3}>
        <ProductCardSkeleton />
      </Grid>
    ));
  }, []);

  const renderErrorMessage = useMemo(() => {
    return (
      <CenterContainer sx={{ minHeight: '400px' }}>
        <SentimentDissatisfiedOutlined sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" color="error">
          Something went wrong.
        </Typography>
        <Typography variant="h5">
          Error: {_.get(error, 'message', 'Failed to fetch products')}
        </Typography>
      </CenterContainer>
    );
  }, [error]);

  const renderEmptyMessage = useMemo(() => {
    return (
      <CenterContainer sx={{ minHeight: '400px' }}>
        <SentimentDissatisfiedOutlined sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4">No products found by your filters.</Typography>
      </CenterContainer>
    );
  }, []);

  return (
    <Box>
      <Grid container columns={12} spacing={2}>
        {state === PRODUCTS_LOADING && renderSkeletons}
        {state === PRODUCTS_ERROR && renderErrorMessage}
        {state === PRODUCTS_EMPTY && renderEmptyMessage}
        {state === PRODUCTS_LIST &&
          products.map((product) => (
            <Grid key={product.id} item xs={12} sm={4} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
