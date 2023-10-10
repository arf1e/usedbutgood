import { SentimentVeryDissatisfiedOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../apis/fakestore';
import SingleProduct from '../components/SingleProduct';
import CenterContainer from '../styled/CenterContainer';

const Product = () => {
  const { id: productId } = useParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(Number(productId));

  if (isLoading) {
    return (
      <CenterContainer sx={{ minHeight: '85vh' }}>
        <CircularProgress size={100} />
      </CenterContainer>
    );
  }

  if (error || !product) {
    return (
      <CenterContainer sx={{ minHeight: '85vh' }}>
        <SentimentVeryDissatisfiedOutlined
          color="error"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h4" color="error.main">
          Error: {_.get(error, 'message', 'Failed to fetch product info.')}
        </Typography>
      </CenterContainer>
    );
  }

  return (
    <Box>
      <SingleProduct product={product} />
    </Box>
  );
};

export default Product;
