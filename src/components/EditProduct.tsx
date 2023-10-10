import { ArrowLeftOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '../apis/fakestore';
import { CreateProductInterface } from '../types/product';
import composeProductUpdateValues from '../utils/productUpdateConverter';
import ProductForm from './ProductForm';

type Props = {
  id: number;
};

export default function EditProduct({ id }: Props) {
  const { data: product } = useGetProductByIdQuery(id);
  const [editProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const handleFormSubmit = async (values: Partial<CreateProductInterface>) => {
    await editProduct({ id, ...values });
  };
  const goToProductPage = useCallback(() => {
    navigate(`/product/${id}`);
  }, [navigate, id]);
  return (
    <Container
      sx={{
        minHeight: '85vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {product && (
            <>
              <Button
                variant="text"
                onClick={goToProductPage}
                startIcon={<ArrowLeftOutlined />}
              >
                To product page
              </Button>
              <ProductForm
                submitFn={handleFormSubmit}
                successMessage="🚀 Product updated!"
                fallbackErrorMessage="Failed to update the product."
                providedValues={composeProductUpdateValues(product)}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
