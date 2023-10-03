import { Box } from '@mui/system';
import Categories from '../components/Categories';
import PostingPromotion from '../components/PostingPromotion';
import Products from '../components/Products';

const Catalog = () => {
  return (
    <Box>
      <Categories />
      <PostingPromotion />
      <Products />
    </Box>
  );
};

export default Catalog;
