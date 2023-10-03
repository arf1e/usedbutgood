import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileQuery } from '../apis/fakestore';
import { AppDispatch, RootState } from '../slices';
import { logOut, selectJwt, selectUser } from '../slices/authSlice';
import { JWTPairType } from '../types/user';

type Props = {
  jwt: JWTPairType;
};

export default function ProfileInfo({ jwt }: Props) {
  const { isLoading, error } = useGetProfileQuery(jwt);
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
