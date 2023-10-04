import { Grid, styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Heading from '../components/Heading';
import ProductForm from '../components/ProductForm';

const NewProductPromotion = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1em;
  }

  .quote {
    max-width: 380px;
    text-align: center;
    line-height: 1.5em;
    margin: 1.5em auto;
  }

  ::before,
  ::after {
    content: '';
    position: absolute;
    z-index: -1;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light};
  }
  ::before {
    width: 290px;
    height: 120px;
    top: 10%;
    transform: rotate(-15deg);
  }

  ::after {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: -20%;
    right: 10%;
  }
`;

export default function New() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container>
        <Heading variant="h1" sx={{ marginY: 8 }} textAlign="center">
          Submit a new posting
        </Heading>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <ProductForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <NewProductPromotion>
              <img
                src="https://api.lorem.space/image/face?w=150&h=150"
                className="avatar"
                alt="happy user of usedbutgood"
              />
              <Typography className="quote" variant="body1">
                I love selling my used stuff on usedbutgood. It's so easy and I
                get to make some extra cash. I am thinking about selling my
                kidney here, but I don't think that's legal.
              </Typography>
              <Typography variant="h6" className="author">
                – Our happy user
              </Typography>
              <Typography variant="caption" className="author-info">
                (Who specifically asked to remain anonymous)
              </Typography>
            </NewProductPromotion>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
