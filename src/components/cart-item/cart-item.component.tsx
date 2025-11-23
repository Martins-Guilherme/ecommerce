import { FunctionComponent } from 'react';

import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from './cart-item.styles';
import CartProduct from '../../types/cart-types';

interface ICartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<ICartItemProps> = ({ product }) => {
  return (
    <>
      <CartItemContainer>
        <CartItemImage $imageUrl={product.imageUrl}></CartItemImage>

        <CartItemInfo>
          <p>{product.name}</p>
          <p>R${product.price}</p>
          <CartItemQuantity>
            <AiOutlineMinus size={20} />
            {product.quantity}
            <AiOutlinePlus size={20} />
          </CartItemQuantity>
        </CartItemInfo>
      </CartItemContainer>
    </>
  );
};

export default CartItem;
