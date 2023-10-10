import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import { selectSort, setSort } from '../slices/productsSlice';
import Heading from '../styles/styled/Heading';
import ProductsFilterContainer from '../styles/styled/ProductsFilterContainer';
import { ProductsSortingOptionType } from '../types/product';

export default function ProductsSorting() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => selectSort(state.products));

  const handleSetSort = (value: ProductsSortingOptionType) => {
    dispatch(setSort(value));
  };

  return (
    <ProductsFilterContainer>
      <Heading variant="h5" sx={{ mb: 2 }}>
        Sorting
      </Heading>
      <ToggleButtonGroup
        value={sort}
        exclusive
        color="primary"
        onChange={(_e, value) => handleSetSort(value)}
      >
        <ToggleButton value="default" disabled={sort === 'default'}>
          Don't care
        </ToggleButton>
        <ToggleButton value="priceAsc" disabled={sort === 'priceAsc'}>
          Price asc
        </ToggleButton>
        <ToggleButton value="priceDesc" disabled={sort === 'priceDesc'}>
          Price desc
        </ToggleButton>
      </ToggleButtonGroup>
    </ProductsFilterContainer>
  );
}
