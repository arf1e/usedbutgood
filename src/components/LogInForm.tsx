import { Box, Button, Grow, styled, TextField, Zoom } from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import _ from 'lodash';
import { useLogInMutation } from '../apis/fakestore';
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
  switchToSignUp: () => void;
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

const initialValues: LoginInterface = {
  email: '',
  password: '',
};

export default function LogInForm({ switchToSignUp }: Props) {
  const { formState, message, setFormState, setMessage } = useStatusBar();
  const [submit] = useLogInMutation();
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
            'Failed to log in.'
          );
          setMessage(errorMessage);
          return;
        }
        setFormState(FORM_SUCCESS);
        setMessage('Successfully logged in.');
        reset();
      } catch (e) {
        setFormState(FORM_ERROR);
        setMessage('Failed to log in due to a network error.');
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
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Log in
                </Button>
              </form>
            )}
          </Formik>
        </LogInFormContainer>
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
