import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllProductsQuery } from '../apis/fakestore';
import ProductCard from '../components/ProductCard';
import { AppDispatch, RootState } from '../slices';
import {
  selectFilters,
  selectProducts,
  setFilterTitle,
} from '../slices/productsSlice';

const Catalog = () => {
  const filters = useSelector((state: RootState) =>
    selectFilters(state.products)
  );
  const { error, isLoading } = useGetAllProductsQuery(filters);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) =>
    selectProducts(state.products)
  );
  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterTitle(e.target.value));
  };
  return (
    <Box flex="1" sx={{ backgroundColor: 'turquoise' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={filters.title}
        onChange={handleTitleUpdate}
      />
      <Container>
        <Typography variant="h1">Catalog</Typography>
        {isLoading && <Typography>Loading...</Typography>}
        <Grid container columns={12} spacing={2}>
          {data.map((product) => (
            <Grid item xs={12} sm={6} md={4}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Catalog;
