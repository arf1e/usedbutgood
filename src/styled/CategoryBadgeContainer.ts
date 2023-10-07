import { Box, styled } from '@mui/material';

const CategoryBadgeContainer = styled(Box)<{
  background: {
    100: string;
    900: string;
  };
  sizing: number;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ sizing }) => `${8 * sizing}px`};
  border-radius: 4px;
  background-color: ${({ background }) => background[100]};
  .icon {
    transform: rotate(45deg);
    margin-right: 8px;
    color: ${({ background }) => background[900]};
  }
  .text {
    color: ${({ background }) => background[900]};
    font-weight: 500;
    font-size: ${({ sizing }) => `${16 * sizing}px`};
  }
`;

export default CategoryBadgeContainer;
