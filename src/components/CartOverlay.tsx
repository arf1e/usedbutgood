import { CloseOutlined } from '@mui/icons-material';
import { Box, Container, IconButton, Slide } from '@mui/material';
import useCartOverlay from '../hooks/useCartOverlay';
import CartOverlayContainer from '../styles/styled/CartOverlayContainer';
import Heading from '../styles/styled/Heading';
import CartItemsList from './CartItemsList';

export default function CartOverlay() {
  const { isShown, hideCartOverlay } = useCartOverlay();
  return (
    <Slide in={isShown}>
      <CartOverlayContainer>
        <Container>
          <Box sx={{ display: 'flex', py: 2, justifyContent: 'flex-end' }}>
            <IconButton onClick={hideCartOverlay}>
              <CloseOutlined className="close-icon" />
            </IconButton>
          </Box>
          <Heading variant="h2">Cart</Heading>
          <CartItemsList handleCloseCart={hideCartOverlay} />
        </Container>
      </CartOverlayContainer>
    </Slide>
  );
}
