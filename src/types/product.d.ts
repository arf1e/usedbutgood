export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
};

export interface ProductApiFiltersInterface {
  title: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  categoryId: string;
}

export interface CreateProductInterface {
  title: string;
  price: string;
  description: string;
  images: string[];
  categoryId: string;
}

export type ProductsSortingOptionType = 'default' | 'priceAsc' | 'priceDesc';
