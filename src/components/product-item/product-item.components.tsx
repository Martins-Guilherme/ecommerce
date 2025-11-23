import { FunctionComponent } from 'react';
import { ProductContainer, ProductImage } from './product-item.styles';
import Category from '../../types/category-types';

interface ProductItemProps {
  category: Category;
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  category,
}) => {
  return (
    <ProductContainer>
      <ProductImage $imageUrl={category.imageUrl} />
    </ProductContainer>
  );
};
