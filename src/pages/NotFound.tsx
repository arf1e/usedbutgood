import {
  ArrowLeftOutlined,
  SentimentVeryDissatisfiedOutlined,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CenterContainer from '../styled/CenterContainer';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <CenterContainer sx={{ minHeight: '80vh' }}>
      <SentimentVeryDissatisfiedOutlined color="error" sx={{ fontSize: 64 }} />
      <Typography variant="h6" color="error" sx={{ mt: 2, mb: 4 }}>
        404: Page Not Found
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        startIcon={<ArrowLeftOutlined />}
      >
        Take me out of here
      </Button>
    </CenterContainer>
  );
}
