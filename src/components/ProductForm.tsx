import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import { useCreateProductMutation } from '../apis/fakestore';
import useStatusBar, {
  FORM_ERROR,
  FORM_LOADING,
  FORM_SUCCESS,
  StatusBar,
} from '../hooks/useStatusBar';
import FormContainer from '../styled/FormContainer';
import Heading from '../styled/Heading';
import { CreateProductInterface } from '../types/product';
import CategoryPicker from './CategoryPicker';

type Props = {
  providedValues?: CreateProductInterface;
};

const initialValues: CreateProductInterface = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: ['https://api.lorem.space/image/fashion?w=640&h=480&r=4278'],
};

export default function ProductForm({ providedValues }: Props) {
  const [submit] = useCreateProductMutation();
  const { formState, message, setFormState, setMessage } = useStatusBar();

  const handleSubmit = async (
    values: CreateProductInterface,
    reset: () => void
  ) => {
    setFormState(FORM_LOADING);
    try {
      const result = await submit(values);
      if ('error' in result) {
        setFormState(FORM_ERROR);
        const errorMessage = _.get(
          result,
          ['error', 'data', 'message'],
          'Failed to create your posting.'
        );
        setMessage(errorMessage);
        return;
      }
      setFormState(FORM_SUCCESS);
      setMessage('🚀 Your posting has been created!');
      reset();
    } catch (e) {
      setFormState(FORM_ERROR);
      setMessage('Network error occured. Please try again later.');
    }
  };
  return (
    <FormContainer>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        onSubmit={(values, helpers) => handleSubmit(values, helpers.resetForm)}
        initialValues={{ ...initialValues, ...providedValues }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Box className="section">
              <Heading variant="h5" sx={{ mb: 2 }}>
                Basic info
              </Heading>
              <TextField
                name="title"
                label="Title"
                sx={{ mb: 2 }}
                variant="standard"
                value={formikProps.values.title}
                onChange={formikProps.handleChange('title')}
              />
              <TextField
                name="price"
                label="Price"
                sx={{ mb: 2 }}
                variant="standard"
                value={formikProps.values.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={formikProps.handleChange('price')}
              />
              <TextField
                name="description"
                multiline={true}
                minRows={4}
                sx={{ mb: 2 }}
                maxRows={8}
                value={formikProps.values.description}
                onChange={formikProps.handleChange('description')}
                label="Description"
              />
              <CategoryPicker
                value={formikProps.values.categoryId}
                setValue={(value) =>
                  formikProps.setFieldValue('categoryId', value)
                }
              />
            </Box>
            <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
              Create posting
            </Button>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
}
