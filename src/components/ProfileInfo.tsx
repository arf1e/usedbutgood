import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileQuery } from '../apis/fakestore';
import { AppDispatch, RootState } from '../slices';
import { logOut, selectJwt, selectUser } from '../slices/authSlice';
import { JWTPairType } from '../types/user';

export default function ProfileInfo() {
  const jwt = useSelector((state: RootState) => selectJwt(state));
  const { isLoading, error } = useGetProfileQuery(jwt as JWTPairType);
  const profile = useSelector((state: RootState) => selectUser(state));
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="body2">{JSON.stringify(profile)}</Typography>
      <Button onClick={handleLogOut}>Log Out</Button>
    </Box>
  );
}
