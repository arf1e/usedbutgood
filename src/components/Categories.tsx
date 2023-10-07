import { Box, Container, styled, Typography, useTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import composeBackgroundColor from '../utils/composeBackgroundColor';
import CategoriesList from './CategoriesList';
import Heading from './Heading';

const AnimatedTag = styled('span')`
  @keyframes glow {
    0% {
      color: inherit;
      transform: scale(1);
    }

    50% {
      color: ${blue['700']};
      transform: scale(1.05);
    }

    100% {
      color: inherit;
      transform: scale(1);
    }
  }
  display: inline-flex;
  animation: glow 6s ease-in-out infinite;
`;

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
