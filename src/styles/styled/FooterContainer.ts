import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

const FooterContainer = styled(Box)`
  margin-top: 4em;
  padding: 2em;
  background-color: ${({ theme }) => composeBackgroundColor(theme)};

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default FooterContainer;
