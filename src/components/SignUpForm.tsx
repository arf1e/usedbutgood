import { Box, Button, Grow, TextField, Zoom } from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import useStatusBar, {
  FORM_ERROR,
  FORM_LOADING,
  FORM_SUCCESS,
} from '../hooks/useStatusBar';
import { SignUpInteface } from '../types/user';
import Heading from '../styled/Heading';
import handleFormSubmit from '../utils/handleFormSubmit';
import AuthFormContainer from '../styled/AuthFormContainer';
import { useSignUpMutation } from '../apis/fakestore';
import * as yup from 'yup';
import { PersonAddAltOutlined } from '@mui/icons-material';
import StatusBar from '../styled/StatusBar';

type Props = {
  switchToLogIn: () => void;
};

const initialValues: SignUpInteface = {
  email: '',
  password: '',
  name: '',
  role: 'customer',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().required('Please provide a password').min(4),
  name: yup.string().required('How should we call you?').min(2),
  avatar: yup
    .string()
    .url('Please provide a valid URL')
    .required('Please provide an avatar'),
});

export default function SignUpForm({ switchToLogIn }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const [signUp] = useSignUpMutation();

  const onFormSuccess = (reset: () => void) => {
    setFormState(FORM_SUCCESS);
    setMessage('Successfully signed up!');
    reset();
  };
  const onError = (error: string) => {
    setFormState(FORM_ERROR);
    setMessage(error);
  };
  const handleSubmit = useCallback(
    async (values: SignUpInteface, reset: () => void) => {
      setFormState(FORM_LOADING);
      await handleFormSubmit(() => signUp(values), {
        onSuccess: () => onFormSuccess(reset),
        onError: onError,
        fallbackErrorMsg: 'Failed to sign up due to a network error.',
      });
    },
    [setFormState, setMessage, signUp]
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
                  Sign up
                </Heading>
                <TextField
                  label="Name"
                  name="name"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange('name')}
                  sx={{ mb: 2 }}
                />
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
                  sx={{ mb: 2 }}
                />
                <Box className="section">
                  <TextField
                    fullWidth
                    label="Avatar URL"
                    name="avatar"
                    value={formikProps.values.avatar}
                    onChange={formikProps.handleChange('avatar')}
                  />
                  {!formikProps.errors.avatar && (
                    <Zoom in={!formikProps.errors.avatar}>
                      <img
                        src={formikProps.values.avatar}
                        alt="avatar"
                        className="avatar"
                      />
                    </Zoom>
                  )}
                </Box>
                <Button
                  type="submit"
                  disabled={!formikProps.dirty || !formikProps.isValid}
                  variant="contained"
                  endIcon={<PersonAddAltOutlined />}
                  sx={{ mt: 2 }}
                >
                  Create account
                </Button>
              </form>
            )}
          </Formik>
        </AuthFormContainer>
        <Button
          variant="text"
          onClick={switchToLogIn}
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
        >
          I already have an account
        </Button>
      </Box>
    </Grow>
  );
}
