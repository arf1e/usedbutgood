import { Box, Button, styled, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { setFilters } from '../slices/productsSlice';
import { ProductApiFiltersInterface } from '../types/product';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Heading from './Heading';
import * as yup from 'yup';
import CategoryPicker from './CategoryPicker';

const ProductsFilterContainer = styled(Box)`
  background: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 8px;
  display: flex;
  padding: 1em;
  flex-direction: column;
  margin: 0;

  form {
    display: flex;
    flex-direction: column;
  }

  .price-range {
    display: flex;
    gap: 1em;
  }
`;

const filtersInitialValues: Partial<ProductApiFiltersInterface> = {
  title: '',
  categoryId: '',
};

const validationSchema = yup.object({
  title: yup.string(),
  categoryId: yup.string().matches(/^\d*$/, 'Must be a number'),
  minPrice: yup.string().matches(/^\d*$/, 'Must be a number'),
  maxPrice: yup.string().matches(/^\d*$/, 'Must be a number'),
});

export default function ProductsFilter() {
  const dispatch = useDispatch();
  const handleSetFilters = (values: Partial<ProductApiFiltersInterface>) => {
    dispatch(setFilters(values));
  };
  return (
    <ProductsFilterContainer>
      <Heading variant="h5" sx={{ mb: 2 }}>
        Filters
      </Heading>
      <Formik
        initialValues={filtersInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSetFilters}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Box className="price-range" sx={{ marginY: 2 }}>
              <TextField
                label="Product title"
                variant="outlined"
                fullWidth
                value={formikProps.values.title}
                onChange={formikProps.handleChange('title')}
              />
              <TextField
                label="Min price"
                variant="outlined"
                value={formikProps.values.minPrice || ''}
                onChange={formikProps.handleChange('minPrice')}
                error={!!formikProps.errors.minPrice}
                fullWidth
              />
              <TextField
                label="Max price"
                variant="outlined"
                value={formikProps.values.maxPrice || ''}
                onChange={formikProps.handleChange('maxPrice')}
                error={!!formikProps.errors.maxPrice}
                fullWidth
              />
            </Box>
            <CategoryPicker
              value={formikProps.values.categoryId || ''}
              setValue={(value) =>
                formikProps.setFieldValue('categoryId', value)
              }
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Apply
            </Button>
          </form>
        )}
      </Formik>
    </ProductsFilterContainer>
  );
}
