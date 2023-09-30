import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useLogInMutation } from '../apis/fakestore';
import { LoginInterface } from '../types/user';

const initialValues: LoginInterface = {
  email: '',
  password: '',
};

export default function LogInForm() {
  const [logIn] = useLogInMutation();
  const handleSubmit = (values: LoginInterface, resetForm: () => void) => {
    logIn(values);
    resetForm();
  };
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikProps) =>
          handleSubmit(values, formikProps.resetForm)
        }
      >
        {(formikProps) => (
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
          >
            <TextField
              value={formikProps.values.email}
              type="email"
              onChange={formikProps.handleChange('email')}
            />
            <TextField
              value={formikProps.values.password}
              type="password"
              onChange={formikProps.handleChange('password')}
            />
            <Button type="submit">Submit</Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
