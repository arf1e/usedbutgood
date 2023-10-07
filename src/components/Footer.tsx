import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import FooterContainer from '../styled/FooterContainer';
import AppLogo from './AppLogo';

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
