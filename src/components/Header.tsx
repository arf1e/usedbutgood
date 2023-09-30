import { Box, Container, Typography } from '@mui/material';
import CartButton from './CartButton';
import CartOverlay from './CartOverlay';
import ProfileButton from './ProfileButton';

export default function Header() {
  return (
    <Box component="header">
      <CartOverlay />
      <Container>
        <Box
          sx={{ display: 'flex', paddingY: 2, justifyContent: 'space-between' }}
        >
          <Typography component="h1" variant="h4">
            FakeStore
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ProfileButton />
            <CartButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
