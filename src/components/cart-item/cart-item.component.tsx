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
import { useDispatch } from 'react-redux';

import {
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart,
} from '../../store/toolkit/cart/cart.slice';

interface ICartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<ICartItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseCartProductQuantity(product.id));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseCartProductQuantity(product.id));
  };

  return (
    <>
      <CartItemContainer>
        <CartItemImage $imageUrl={product.imageUrl}></CartItemImage>

        <CartItemInfo>
          <p>{product.name}</p>
          <p>R${product.price}</p>

          <CartItemQuantity>
            <AiOutlineMinus onClick={handleDecreaseClick} size={20} />
            {product.quantity}
            <AiOutlinePlus onClick={handleIncreaseClick} size={20} />
          </CartItemQuantity>
        </CartItemInfo>

        <RemoveButton onClick={handleRemoveClick}>
          <AiOutlineClose size={25} />
        </RemoveButton>
      </CartItemContainer>
    </>
  );
};

export default CartItem;
