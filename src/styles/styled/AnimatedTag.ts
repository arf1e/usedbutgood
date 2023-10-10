import { styled } from '@mui/material';
import { blue } from '@mui/material/colors';

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

export default AnimatedTag;
