import { Box, Container, Typography } from '@mui/material';
import CartButton from './CartButton';
import CartOverlay from './CartOverlay';

export default function Header() {
  return (
    <Box component="header" sx={{ backgroundColor: 'lightblue' }}>
      <CartOverlay />
      <Container>
        <Box
          sx={{ display: 'flex', paddingY: 2, justifyContent: 'space-between' }}
        >
          <Typography component="h1" variant="h4">
            FakeStore
          </Typography>
          <CartButton />
        </Box>
      </Container>
    </Box>
  );
}
