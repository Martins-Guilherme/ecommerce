import { FunctionComponent, useContext } from 'react';

import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai';

import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton,
} from './cart-item.styles';
import CartProduct from '../../types/cart-types';
import { CartContext } from '../../contexts/cart.context';

interface ICartItemProps {
  product: CartProduct;
}

const CartItem: FunctionComponent<ICartItemProps> = ({ product }) => {
  const { removeProductFromCart } = useContext(CartContext);

  const handleRemoveClick = () => {
    removeProductFromCart(product.id);
  };

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

        <RemoveButton onClick={handleRemoveClick}>
          <AiOutlineClose size={25} />
        </RemoveButton>
      </CartItemContainer>
    </>
  );
};

export default CartItem;
