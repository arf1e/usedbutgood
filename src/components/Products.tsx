import { Container, Grid } from '@mui/material';
import Heading from '../styled/Heading';
import ProductList from './ProductList';
import ProductsFilter from './ProductsFilter';
import ProductsPagination from './ProductsPagination';
import ProductsSorting from './ProductsSorting';

export default function Products() {
  return (
    <Container>
      <Heading variant="h3" sx={{ mb: 4 }}>
        Product catalog
      </Heading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProductsFilter />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductsSorting />
        </Grid>
        <Grid item xs={12}>
          <ProductList />
        </Grid>
        <Grid item xs={12}>
          <ProductsPagination />
        </Grid>
      </Grid>
    </Container>
  );
}
