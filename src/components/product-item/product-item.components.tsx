import { FunctionComponent } from 'react';
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles';
import Product from '../../types/products-types';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  product,
}) => {
  if (!product) {
    console.log('error no product', product);
    return null;
  }
  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl} />
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price.toFixed(2)}</p>
      </ProductInfo>
    </ProductContainer>
  );
};
