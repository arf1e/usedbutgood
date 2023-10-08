import { Box, styled } from '@mui/material';

const CartOverlayContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 2;
  background-color: ${({ theme }) => theme.palette.background.default};
  /* backdrop-filter: blur(200px); */

  .close-icon {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export default CartOverlayContainer;
