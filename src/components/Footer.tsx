import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import AppLogo from './AppLogo';

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

export default function Footer() {
  return (
    <FooterContainer component="footer">
      <Container className="content">
        <AppLogo />
        <Box className="copyright">
          <Typography variant="body2" color="text.primary">
            © 2023, usedbutgood
          </Typography>
          <Typography variant="caption" color="text.secondary">
            We're not a real company.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}
