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
  category: Category;
  images: string[];
};

export interface ProductApiFiltersInterface {
  title: string;
  price: number;
  priceRange: [number, number];
  categoryId: number;
}

export interface CreateProductInterface {
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}
