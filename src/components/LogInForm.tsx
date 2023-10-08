import { Box, Button, Grow, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { useLogInMutation } from '../apis/fakestore';
import useStatusBar, {
  FORM_ERROR,
  FORM_LOADING,
  FORM_SUCCESS,
} from '../hooks/useStatusBar';
import { LoginInterface } from '../types/user';
import Heading from '../styled/Heading';
import AuthFormContainer from '../styled/AuthFormContainer';
import handleFormSubmit from '../utils/handleFormSubmit';
import * as yup from 'yup';
import { LoginOutlined } from '@mui/icons-material';
import StatusBar from '../styled/StatusBar';

type Props = {
  switchToSignUp: () => void;
};

const initialValues: LoginInterface = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().required('Please provide a password').min(4),
});

export default function LogInForm({ switchToSignUp }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const [submit] = useLogInMutation();

  const handleSubmitError = useCallback(
    (error: string) => {
      setFormState(FORM_ERROR);
      setMessage(error);
    },
    [setFormState, setMessage]
  );

  const handleSubmitSuccess = (reset: () => void) => {
    setFormState(FORM_SUCCESS);
    setMessage('Successfully logged in.');
    reset();
  };

  const handleSubmit = useCallback(
    async (values: LoginInterface, reset: () => void) => {
      setFormState(FORM_LOADING);
      await handleFormSubmit(() => submit(values), {
        onSuccess: () => handleSubmitSuccess(reset),
        onError: handleSubmitError,
        fallbackErrorMsg: 'Failed to log in due to a network error.',
      });
    },
    [submit, handleSubmitSuccess, handleSubmitError, setFormState]
  );
  return (
    <Grow in={true}>
      <Box>
        <AuthFormContainer>
          <StatusBar state={formState}>{message}</StatusBar>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
          >
            {(formikProps) => (
              <form onSubmit={formikProps.handleSubmit}>
                <Heading variant="h5" sx={{ mb: 3 }}>
                  Log in
                </Heading>
                <TextField
                  label="Email"
                  name="email"
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange('email')}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  name="password"
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange('password')}
                  type="password"
                />
                <Button
                  type="submit"
                  disabled={!formikProps.dirty || !formikProps.isValid}
                  variant="contained"
                  sx={{ mt: 2 }}
                  endIcon={<LoginOutlined />}
                >
                  Log in
                </Button>
              </form>
            )}
          </Formik>
        </AuthFormContainer>
        <Button
          variant="text"
          onClick={switchToSignUp}
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
        >
          I don't have an account yet
        </Button>
      </Box>
    </Grow>
  );
}
