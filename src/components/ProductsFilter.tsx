import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setFilters } from '../slices/productsSlice';
import { ProductApiFiltersInterface } from '../types/product';
import * as yup from 'yup';
import CategoryPicker from './CategoryPicker';
import { RootState } from '../slices';
import ProductsFilterContainer from '../styled/ProductsFilterContainer';
import Heading from '../styled/Heading';
import { CheckOutlined, ClearOutlined } from '@mui/icons-material';
import _ from 'lodash';

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
  const filters = useSelector((state: RootState) =>
    selectFilters(state.products)
  );
  const handleReset = () => {
    dispatch(setFilters(filtersInitialValues));
  };

  return (
    <ProductsFilterContainer>
      <Heading variant="h5" sx={{ mb: 2 }}>
        Filters
      </Heading>
      <Formik
        initialValues={{ ...filtersInitialValues, ...filters }}
        validationSchema={validationSchema}
        onSubmit={handleSetFilters}
        onReset={handleReset}
      >
        {(formikProps) => (
          <form
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
          >
            <Box className="section" sx={{ marginY: 2 }}>
              <TextField
                label="Product title"
                variant="outlined"
                fullWidth
                value={formikProps.values.title}
                onChange={formikProps.handleChange('title')}
              />
              <CategoryPicker
                value={formikProps.values.categoryId || ''}
                setValue={(value) =>
                  formikProps.setFieldValue('categoryId', value)
                }
              />
            </Box>
            <Box className="section" sx={{ marginY: 2 }}>
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
            <Box className="section" sx={{ marginY: 2 }}>
              <Button
                type="submit"
                disabled={!formikProps.isValid || !formikProps.dirty}
                fullWidth
                variant="contained"
                startIcon={<CheckOutlined />}
              >
                Apply
              </Button>
              <Button
                type="reset"
                fullWidth
                variant="outlined"
                onClick={() =>
                  formikProps.resetForm({ values: filtersInitialValues })
                }
                color="error"
                disabled={_.isEqual(formikProps.values, filtersInitialValues)}
                startIcon={<ClearOutlined />}
              >
                Reset
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </ProductsFilterContainer>
  );
}
