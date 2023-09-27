import { ProductApiFiltersInterface } from '../types/product';

export const mapFiltersToQueryParams = (
  filters: Partial<ProductApiFiltersInterface>
) => {
  return {
    ...filters,
    ...(filters.priceRange && {
      price_min: filters.priceRange[0],
      price_max: filters.priceRange[1],
    }),
  };
};
