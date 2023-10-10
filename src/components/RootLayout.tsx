import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Toaster from './Toaster';

const RootLayout = () => {
  return (
    <Box>
      <Toaster />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
};

export default RootLayout;
