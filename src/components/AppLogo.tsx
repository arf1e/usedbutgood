import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppLogoButton from '../styles/styled/AppLogoButton';

export default function AppLogo() {
  const navigate = useNavigate();
  return (
    <AppLogoButton onClick={() => navigate('/')} component="button">
      <Typography
        variant="body1"
        className="text"
        sx={{
          padding: 0,
          fontWeight: '600',
        }}
      >
        usedbutgood
      </Typography>
    </AppLogoButton>
  );
}
