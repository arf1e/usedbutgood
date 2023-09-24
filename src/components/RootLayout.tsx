import { Box, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
const RootLayout = () => {
  return (
    <>
      <Box component="header" sx={{ backgroundColor: 'lightblue' }}>
        <Typography variant="body2">Header</Typography>
      </Box>
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
