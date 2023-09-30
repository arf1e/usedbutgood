import { LoginOutlined, PersonOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../slices';
import { selectUser } from '../slices/authSlice';

export default function ProfileButton() {
  const user = useSelector((state: RootState) => selectUser(state));
  const navigate = useNavigate();
  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);
  return (
    <IconButton onClick={handleProfileClick}>
      {user && <PersonOutlined />}
      {!user && <LoginOutlined />}
    </IconButton>
  );
}
