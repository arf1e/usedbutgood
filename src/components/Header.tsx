import { Box, Container, Typography, useTheme } from '@mui/material';
import AppLogo from './AppLogo';
import CartButton from './CartButton';
import CartOverlay from './CartOverlay';
import ProfileButton from './ProfileButton';
import ThemeSwitch from './ThemeSwitch';

export default function Header() {
  const theme = useTheme();
  return (
    <Box component="header">
      <CartOverlay />
      <Container>
        <Box
          sx={{
            display: 'flex',
            paddingY: 2,
            bgcolor: theme.palette.background.default,
            justifyContent: 'space-between',
          }}
        >
          <AppLogo />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ThemeSwitch />
            <ProfileButton />
            <CartButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
