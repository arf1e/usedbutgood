import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import LogInForm from '../components/LogInForm';
import ProfileInfo from '../components/ProfileInfo';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function Profile() {
  const isLoggedIn = useSelector((state: RootState) => selectJwt(state));
  return (
    <Box>
      <Typography variant="h1">Profile</Typography>
      {!isLoggedIn && <LogInForm />}
      {isLoggedIn && <ProfileInfo />}
    </Box>
  );
}
