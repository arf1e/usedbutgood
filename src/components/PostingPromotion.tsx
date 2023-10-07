import PromotionImage from '../assets/img/posting-promotion.png';
import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PostingPromotionContainer from '../styled/PostingPromotionContainer';
import Heading from '../styled/Heading';

export default function PostingPromotion() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/new');
  return (
    <Container sx={{ marginY: 8 }}>
      <PostingPromotionContainer padding={4} borderRadius={4}>
        <Box className="info">
          <Heading variant="h3" sx={{ mb: 4 }}>
            Sell your items on usedbutgood
          </Heading>
          <Typography variant="body1" className="description">
            Got a treasure trove of quirky collectibles, peculiar paraphernalia,
            or downright bizarre belongings gathering dust in your closet? It's
            time to set your inner eccentric free and share the love on our
            one-of-a-kind platform!
          </Typography>
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{ mt: 2 }}
            endIcon={<ArrowForward />}
          >
            Sell my stuff
          </Button>
        </Box>
        <Box className="decoration">
          <img src={PromotionImage} alt="" className="base-image" />
        </Box>
      </PostingPromotionContainer>
    </Container>
  );
}
