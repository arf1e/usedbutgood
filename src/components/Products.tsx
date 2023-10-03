import { Container, Grid } from '@mui/material';
import Heading from './Heading';
import ProductList from './ProductList';
import ProductsFilter from './ProductsFilter';

export default function Products() {
  return (
    <Container>
      <Heading variant="h3" sx={{ mb: 4 }}>
        Product catalog
      </Heading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ProductsFilter />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductList />
        </Grid>
      </Grid>
    </Container>
  );
}
