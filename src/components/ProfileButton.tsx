import { LoginOutlined, PersonOutlined } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProfileButton() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  return (
    <IconButton onClick={handleProfileClick}>
      {user && <PersonOutlined sx={{ color: theme.palette.primary.main }} />}
      {!user && <LoginOutlined sx={{ color: theme.palette.primary.main }} />}
    </IconButton>
  );
}
