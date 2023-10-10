import { Box, styled } from '@mui/material';
import composeBackgroundColor from '../../utils/composeBackgroundColor';

const PostingPromotionContainer = styled(Box)`
  @keyframes float {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-15px);
    }

    100% {
      transform: translateX(0);
    }
  }

  display: flex;
  background: ${({ theme }) => composeBackgroundColor(theme)};
  flex-direction: row;
  align-items: center;
  gap: 24px;

  .info {
    flex: 3;

    .description {
      width: 70%;
    }
  }

  .decoration {
    flex: 2;
    position: relative;
    .base-image {
      width: 100%;
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? theme.palette.primary.dark
          : theme.palette.primary.light};
    }
    &::before {
      width: 30%;
      height: 14%;
      top: 30%;
      left: -10%;
      rotate: 30deg;
      animation: float 4s ease-out infinite;
    }
    &::after {
      width: 15%;
      height: 2%;
      bottom: 30%;
      left: -5%;
      rotate: -30deg;
      animation: float 3s linear infinite;
    }
  }
`;

export default PostingPromotionContainer;
