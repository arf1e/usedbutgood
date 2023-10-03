import PromotionImage from '../assets/img/posting-promotion.png';
import { Box, Button, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Heading from './Heading';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PostingPromotionContainer = styled(Box)`
  @keyframes float {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-15px);
    }

    100% {
      transform: translateX(0);
    }
  }

  display: flex;
  background: ${({ theme }) => composeBackgroundColor(theme)};
  flex-direction: row;
  align-items: center;
  gap: 24px;

  .info {
    flex: 3;

    .description {
      width: 70%;
    }
  }

  .decoration {
    flex: 2;
    position: relative;
    .base-image {
      width: 100%;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? theme.palette.primary.dark
          : theme.palette.primary.light};
    }
    &::before {
      width: 30%;
      height: 14%;
      top: 30%;
      left: -10%;
      rotate: 30deg;
      animation: float 4s ease-out infinite;
    }
    &::after {
      width: 15%;
      height: 2%;
      bottom: 30%;
      left: -5%;
      rotate: -30deg;
      animation: float 3s linear infinite;
    }
  }
`;

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
          <img src={PromotionImage} className="base-image" />
        </Box>
      </PostingPromotionContainer>
    </Container>
  );
}
