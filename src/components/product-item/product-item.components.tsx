import { FunctionComponent, useContext } from 'react';
import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles';
import Product from '../../types/products-types';

import CustomButton from '../custom-button/custom-button.components';
import { BsCartPlus } from 'react-icons/bs';
import { CartContext } from '../../contexts/cart.context';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  product,
}) => {
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = () => {
    addProductToCart(product);
  };

  return (
    <ProductContainer>
      <ProductImage $imageUrl={product.imageUrl}>
        <CustomButton
          onClick={handleAddToCartClick}
          startIcon={<BsCartPlus size={20} />}
        >
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price.toFixed(2)}</p>
      </ProductInfo>
    </ProductContainer>
  );
};
