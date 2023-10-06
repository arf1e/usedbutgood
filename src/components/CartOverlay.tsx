import { CloseOutlined } from '@mui/icons-material';
import { Box, Container, IconButton, Slide, styled } from '@mui/material';
import useCartOverlay from '../hooks/useCartOverlay';
import Heading from './Heading';

const CartOverlayContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.background.default};

  .close-icon {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

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
        </Container>
      </CartOverlayContainer>
    </Slide>
  );
}
