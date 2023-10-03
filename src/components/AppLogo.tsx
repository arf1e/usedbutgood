import { Box, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppLogoButton = styled(Box)`
  background: none;
  display: flex;
  align-items: center;
  border: 0;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: ${({ theme }) => `8px solid ${theme.palette.primary.light}`};
  position: relative;
  .text {
    padding: 0;
    color: ${({ theme }) => theme.palette.text.primary};
    transition: inherit;
    fontweight: 600;
  }

  &:hover {
    border-bottom-width: 12px;
    .text {
      transform: translateY(4px);
    }
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
export default function AppLogo() {
  const navigate = useNavigate();
  return (
    <AppLogoButton onClick={() => navigate('/')} component="button">
      <Typography
        variant="body1"
        className="text"
        sx={{
          padding: 0,
          fontWeight: '600',
        }}
      >
        usedbutgood
      </Typography>
    </AppLogoButton>
  );
}
