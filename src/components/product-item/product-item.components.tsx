import { FunctionComponent } from 'react';
import Product from '../../types/products-types';
import { ProductContainer, ProductImage } from './product-item.styles';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  product,
}) => {
  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl} />
    </ProductContainer>
  );
};
