import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles';
import { BsCartPlus } from 'react-icons/bs';

import Product from '../../types/products-types';

import { addProductToCart } from '../../store/toolkit/cart/cart.slice';

import CustomButton from '../custom-button/custom-button.components';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: FunctionComponent<ProductItemProps> = ({
  product,
}) => {
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    dispatch(addProductToCart(product));
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
