import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useCreateProductMutation } from '../apis/fakestore';
import ProductForm from '../components/ProductForm';
import Heading from '../styled/Heading';
import NewProductPromotion from '../styled/NewProductPromotion';
import { CreateProductInterface } from '../types/product';

export default function NewProduct() {
  const [createProduct] = useCreateProductMutation();
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container>
        <Heading variant="h1" id="top" sx={{ marginY: 8 }} textAlign="center">
          Submit a new posting
        </Heading>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <ProductForm
              submitFn={(values: CreateProductInterface) =>
                createProduct(values)
              }
              shouldResetOnSuccess={true}
              successMessage="🚀 Success! Your product has been submitted."
            />
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
