import { CreateProductInterface, ProductType } from '../types/product';

const composeProductUpdateValues = (
  product: ProductType
): CreateProductInterface => {
  const { title, description, price, images, category } = product;
  return {
    title,
    description,
    price: price.toString(),
    images,
    categoryId: category.id.toString(),
  };
};

export default composeProductUpdateValues;
