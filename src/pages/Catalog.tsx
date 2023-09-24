import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetProductsQuery } from '../apis/fakestore';

const Catalog = () => {
  const { error, data, isLoading } = useGetProductsQuery();
  return (
    <Box flex="1" sx={{ backgroundColor: 'turquoise' }}>
      <Container>
        {JSON.stringify(data)}
        <Typography variant="h1">Catalog</Typography>
      </Container>
    </Box>
  );
};

export default Catalog;
