import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetProductsQuery } from '../apis/fakestore';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const { error, data, isLoading } = useGetProductsQuery();
  return (
    <Box flex="1" sx={{ backgroundColor: 'turquoise' }}>
      <Container>
        <Typography variant="h1">Catalog</Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {data && (
          <Grid container columns={12} spacing={2}>
            {data.map((product) => (
              <Grid item xs={12} sm={6} md={4}>
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Catalog;
