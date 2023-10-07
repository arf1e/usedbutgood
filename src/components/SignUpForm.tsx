import { Box, Button, Grow, styled, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import _ from 'lodash';
import useStatusBar, {
  FORM_ERROR,
  FORM_LOADING,
  FORM_SUCCESS,
  StatusBar,
} from '../hooks/useStatusBar';
import { LoginInterface } from '../types/user';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import Heading from './Heading';

type Props = {
  switchToLogIn: () => void;
};

const LogInFormContainer = styled(Box)`
  background-color: ${({ theme }) => composeBackgroundColor(theme)};
  border-radius: 1em;

  form {
    padding: 2em;
    display: flex;
    flex-direction: column;
  }
`;

const initialValues = {
  email: '',
  password: '',
  name: '',
  role: 'customer',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
};

export default function SignUpForm({ switchToLogIn }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const submit = async (obj: any) => ({ result: obj });
  const handleSubmit = useCallback(
    async (values: LoginInterface, reset: () => void) => {
      setFormState(FORM_LOADING);
      try {
        const result = await submit(values);
        if ('error' in result) {
          setFormState(FORM_ERROR);
          const errorMessage = _.get(
            result,
            ['error', 'data', 'message'],
            'Failed to create an account.'
          );
          setMessage(errorMessage);
          return;
        }
        setFormState(FORM_SUCCESS);
        setMessage('Successfully signed up!');
        reset();
      } catch (e) {
        setFormState(FORM_ERROR);
        setMessage('Failed to send a form due to a network error.');
      }
    },
    [setFormState, setMessage, submit]
  );
  return (
    <Grow in={true}>
      <Box>
        <LogInFormContainer>
          <StatusBar state={formState}>{message}</StatusBar>
          <Formik
            initialValues={initialValues}
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
                <TextField
                  label="Name"
                  name="name"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange('name')}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Create account
                </Button>
              </form>
            )}
          </Formik>
        </LogInFormContainer>
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
