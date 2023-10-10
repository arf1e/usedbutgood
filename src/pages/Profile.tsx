import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import Auth from '../components/Auth';
import ProfileInfo from '../components/ProfileInfo';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function Profile() {
  const jwt = useSelector((state: RootState) => selectJwt(state.auth));

  return (
    <Box>
      {!jwt && <Auth />}
      {jwt && <ProfileInfo jwt={jwt} />}
    </Box>
  );
}
