import { Box, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import Heading from '../styled/Heading';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';

type AUTH_FORM = typeof LOGIN | typeof SIGNUP;

export default function Auth() {
  const [currentForm, setCurrentForm] = useState<AUTH_FORM>(LOGIN);
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container>
        <Heading variant="h1" sx={{ marginY: 8 }} textAlign="center">
          Knock-knock. Who's there?
        </Heading>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            {currentForm === LOGIN && (
              <LogInForm switchToSignUp={() => setCurrentForm(SIGNUP)} />
            )}
            {currentForm === SIGNUP && (
              <SignUpForm switchToLogIn={() => setCurrentForm(LOGIN)} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
