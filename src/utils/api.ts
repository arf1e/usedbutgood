export const DEFAULT_PRODUCTS_PER_PAGE = 10;

export const generatePaginationParams = (
  page: number = 1,
  limit: number = DEFAULT_PRODUCTS_PER_PAGE
) => {
  return {
    offset: (page - 1) * limit,
    limit,
  };
};
