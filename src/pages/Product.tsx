import { Box, Container, Grid } from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../apis/fakestore';
import SingleProduct from '../components/SingleProduct';

const Product = () => {
  const { id: productId } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useGetProductByIdQuery(Number(productId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return (
      <div>
        Error: {_.get(error, 'message', 'Failed to fetch product info.')}
      </div>
    );
  }

  return (
    <Box>
      <SingleProduct product={product} />
    </Box>
  );
};

export default Product;
