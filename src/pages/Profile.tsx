import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import LogInForm from '../components/LogInForm';
import ProfileInfo from '../components/ProfileInfo';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function Profile() {
  const jwt = useSelector((state: RootState) => selectJwt(state));
  return (
    <Box>
      {!jwt && <LogInForm />}
      {jwt && <ProfileInfo jwt={jwt} />}
    </Box>
  );
}
