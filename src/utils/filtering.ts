import { ProductApiFiltersInterface } from '../types/product';

export const mapFiltersToQueryParams = (
  filters: Partial<ProductApiFiltersInterface>
) => {
  return {
    ...filters,
    ...(filters.minPrice && {
      price_min: filters.minPrice,
    }),
    ...(filters.maxPrice && {
      price_max: filters.maxPrice,
    }),
  };
};
