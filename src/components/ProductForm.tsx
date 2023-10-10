import {
  Box,
  Button,
  InputAdornment,
  Skeleton,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import useStatusBar, {
  FORM_ERROR,
  FORM_LOADING,
  FORM_SUCCESS,
} from '../hooks/useStatusBar';
import FormContainer from '../styled/FormContainer';
import Heading from '../styled/Heading';
import StatusBar from '../styled/StatusBar';
import { CreateProductInterface } from '../types/product';
import CategoryPicker from './CategoryPicker';
import { useCallback } from 'react';
import handleAsyncOperation from '../utils/handleAsyncOperation';
import ImageryInput from './ImageryInput';
import * as yup from 'yup';

type Props = {
  providedValues?: CreateProductInterface;
  submitFn: (values: CreateProductInterface) => Promise<unknown>;
  shouldResetOnSuccess?: boolean;
  successMessage?: string;
  fallbackErrorMessage?: string;
};

const initialValues: CreateProductInterface = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: [],
};

const REQUIRED_IMAGE_MESSAGE = 'At least one image is required';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  price: yup.string().matches(/^\d+$/, 'Price must be a number'),
  description: yup.string().required('Description is required'),
  categoryId: yup.string().required('Category is required'),
  images: yup
    .array()
    .of(
      yup
        .string()
        .required('Please input the URL or remove the image')
        .url('Image must be a valid URL')
    )
    .min(1, REQUIRED_IMAGE_MESSAGE),
});

export default function ProductForm({
  providedValues,
  submitFn,
  shouldResetOnSuccess = false,
  successMessage = '🚀 Success!',
  fallbackErrorMessage = 'Network error occured. Please try again later.',
}: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();

  const onSubmitSuccess = useCallback(
    (reset: () => void) => {
      setFormState(FORM_SUCCESS);
      setMessage(successMessage);
      if (shouldResetOnSuccess) {
        reset();
      }
    },
    [setFormState, setMessage, shouldResetOnSuccess, successMessage]
  );

  const onSubmitError = useCallback(() => {
    setFormState(FORM_ERROR);
    setMessage('Network error occured. Please try again later.');
  }, [setFormState, setMessage]);

  const handleSubmit = useCallback(
    async (values: CreateProductInterface, reset: () => void) => {
      setFormState(FORM_LOADING);
      await handleAsyncOperation(() => submitFn(values), {
        onSuccess: () => onSubmitSuccess(reset),
        onError: onSubmitError,
        fallbackErrorMsg: fallbackErrorMessage,
      });
    },
    [
      submitFn,
      onSubmitSuccess,
      onSubmitError,
      setFormState,
      fallbackErrorMessage,
    ]
  );

  return (
    <FormContainer>
      <StatusBar state={formState}>{message}</StatusBar>
      <Formik
        onSubmit={(values, helpers) => handleSubmit(values, helpers.resetForm)}
        validationSchema={validationSchema}
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
                value={formikProps.values.title}
                onChange={formikProps.handleChange('title')}
              />
              <TextField
                name="price"
                label="Price"
                error={!!formikProps.errors.price}
                sx={{ mb: 2 }}
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
                maxRows={4}
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
            <ImageryInput
              images={formikProps.values.images}
              errors={_.without(
                formikProps.errors.images || [],
                REQUIRED_IMAGE_MESSAGE
              )}
              addImage={() =>
                formikProps.setFieldValue('images', [
                  ...formikProps.values.images,
                  '',
                ])
              }
              removeImage={(index) => {
                const newImages = _.cloneDeep(formikProps.values.images);
                _.remove(newImages, (_image, i) => i === index);
                formikProps.setFieldValue('images', newImages);
              }}
              changeHandler={(index, value) =>
                formikProps.setFieldValue(`images[${index}]`, value)
              }
            />
            <Button
              fullWidth
              disabled={!formikProps.isValid}
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
            >
              {formState === FORM_LOADING ? 'Working on it...' : 'Submit'}
            </Button>
          </form>
        )}
      </Formik>
    </FormContainer>
  );
}

export const ProductFormSkeleton = () => {
  return (
    <FormContainer>
      <form>
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="100%" height={60} />
        <Skeleton variant="text" width="100%" height={240} />
        <Skeleton variant="text" width="100%" height={60} />
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="text" width="20%" height={40} />
        <Skeleton variant="text" width="100%" height={60} />
      </form>
    </FormContainer>
  );
};
