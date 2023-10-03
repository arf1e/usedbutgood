import { LabelOutlined } from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { CategoryType } from '../types/product';
import hashBadgeColor from '../utils/hashBadgeColor';

type Props = {
  category: CategoryType;
  size?: 'small' | 'medium' | 'large';
};

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

const CategoryBadge = ({ category, size = 'medium' }: Props) => {
  const hashedColor = hashBadgeColor(category.name);

  const sizing = {
    small: 0.7,
    medium: 1,
    large: 1.2,
  }[size];

  return (
    <CategoryBadgeContainer background={hashedColor} sizing={sizing}>
      <LabelOutlined className="icon" fontSize={size} />
      <Typography variant="body1" className="text">
        {category.name}
      </Typography>
    </CategoryBadgeContainer>
  );
};

export default CategoryBadge;
