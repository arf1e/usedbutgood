import { LabelOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import CategoryBadgeContainer from '../styled/CategoryBadgeContainer';
import { CategoryType } from '../types/product';
import hashBadgeColor from '../utils/hashBadgeColor';

type Props = {
  category: CategoryType;
  size?: 'small' | 'medium' | 'large';
};

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
