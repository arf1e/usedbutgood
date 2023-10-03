import { Box, Container, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useMemo } from 'react';
import useColorMode from '../hooks/useColorMode';
import CategoriesList from './CategoriesList';
import Heading from './Heading';

export default function Categories() {
  const { colorMode } = useColorMode();
  const bgColor = useMemo(
    () => (colorMode === 'light' ? grey[100] : grey[900]),
    [colorMode]
  );
  return (
    <Container sx={{ marginY: 8 }}>
      <Box padding={4} bgcolor={bgColor} borderRadius={4}>
        <Heading variant="h3" sx={{ mb: 4 }}>
          A service like you have never <span>#usedbefore</span>
        </Heading>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our categories is where unicorns play dress-up, pirates trade parrots
          for pogo sticks, and time-traveling toasters cozy up with antique
          teapots. From Flamingo Feathered Furnishings to Ninja Turtles
          Tchotchkes, we've got it all. Prepare to embark on a surreal shopping
          spree where the only limit is your imagination (and maybe your
          pocketbook)! So dive in, and let the peculiar perusal commence!
        </Typography>
        <CategoriesList />
      </Box>
    </Container>
  );
}
