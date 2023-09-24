export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: Category;
  images: string[];
};

export interface ProductApiFiltersInterface {
  title: string;
  price: number;
  price_min: number;
  price_max: number;
  categoryId: number;
}
