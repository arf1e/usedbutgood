import { Box, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Box component="footer" sx={{ backgroundColor: 'lightcoral' }}>
        <Typography variant="body2">Footer</Typography>
      </Box>
    </>
  );
};

export default RootLayout;
