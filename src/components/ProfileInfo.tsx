import {
  LogoutOutlined,
  SentimentVeryDissatisfiedOutlined,
} from '@mui/icons-material';
import _ from 'lodash';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileQuery } from '../apis/fakestore';
import { AppDispatch, RootState } from '../slices';
import { logOut, selectUser } from '../slices/authSlice';
import CenterContainer from '../styled/CenterContainer';
import Heading from '../styled/Heading';
import ProfileContainer from '../styled/ProfileContainer';
import ProfileImage from '../styled/ProfileImage';
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
  if (isLoading)
    return (
      <CenterContainer>
        <CircularProgress size={100} />
      </CenterContainer>
    );

  if (error)
    return (
      <CenterContainer>
        <SentimentVeryDissatisfiedOutlined
          color="error"
          sx={{ fontSize: 64, mb: 4 }}
        />
        <Typography variant="h6" color="error">
          {`Error: ${_.get(error, 'message', 'Failed to fetch your profile')}`}
        </Typography>
      </CenterContainer>
    );

  return (
    <Container sx={{ my: 8, minHeight: '100vh' }}>
      <Heading variant="h1" align="center">
        {profile?.name}`s Profile
      </Heading>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <ProfileContainer>
            <Heading variant="h6" sx={{ mb: 1 }}>
              Name
            </Heading>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {profile?.name}
            </Typography>
            <Heading variant="h6" sx={{ mb: 1 }}>
              Email
            </Heading>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {profile?.email}
            </Typography>
            <Heading variant="h6" sx={{ mb: 1 }}>
              Role
            </Heading>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {profile?.role}
            </Typography>
            <Heading variant="h6" sx={{ mb: 1 }}>
              ID
            </Heading>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {profile?.id}
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleLogOut}
              endIcon={<LogoutOutlined />}
            >
              Log Out
            </Button>
          </ProfileContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center ',
            }}
          >
            <ProfileImage src={profile?.avatar} alt={profile?.name} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
