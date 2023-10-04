import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material';
import { useGetCategoriesQuery } from '../apis/fakestore';

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export default function CategoryPicker({ value, setValue }: Props) {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  if (isLoading) return <Skeleton width="100%" height="60" />;

  if (categories) {
    return (
      <FormControl fullWidth>
        <InputLabel id="category-input">Category</InputLabel>
        <Select
          label="Category"
          labelId="category-input"
          value={value}
          fullWidth
          onChange={(e) => setValue(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return <></>;
}
