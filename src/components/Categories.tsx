import { Box, Container, Typography, useTheme } from '@mui/material';
import AnimatedTag from '../styled/AnimatedTag';
import Heading from '../styled/Heading';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import CategoriesList from './CategoriesList';

export default function Categories() {
  const theme = useTheme();
  return (
    <Container sx={{ marginY: 8 }}>
      <Box padding={4} bgcolor={composeBackgroundColor(theme)} borderRadius={4}>
        <Heading variant="h3" sx={{ mb: 4 }}>
          A service like you have never <AnimatedTag>#usedbefore</AnimatedTag>
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
