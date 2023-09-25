import { CloseOutlined } from '@mui/icons-material';
import { Box, Container, IconButton, Typography } from '@mui/material';
import useCartOverlay from '../hooks/useCartOverlay';

export default function CartOverlay() {
  const { isShown, hideCartOverlay } = useCartOverlay();

  if (!isShown) return <></>;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'white',
      }}
    >
      <Container>
        <Box sx={{ display: 'flex', py: 2, justifyContent: 'flex-end' }}>
          <IconButton onClick={hideCartOverlay}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Typography variant="h2" component="h2">
          Cart
        </Typography>
      </Container>
    </Box>
  );
}
