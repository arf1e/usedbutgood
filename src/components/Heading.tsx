import { styled, Typography } from '@mui/material';

export default styled(Typography)`
  font-weight: bold;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    bottom: -0.1em;
    left: 0px;
    background: ${({ theme }) => theme.palette.text.primary};
    width: 1em;
    height: 0.2em;
  }
`;
