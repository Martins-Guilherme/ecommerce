import { FunctionComponent, useContext } from 'react';
import { BsCartCheck } from 'react-icons/bs';

import { CartContext } from '../../contexts/cart.context';

import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../cart-item/cart-item.component';

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './cart.styles';

const Cart: FunctionComponent = () => {
  const { isVisible, togleCart, products, productsTotalPrice } =
    useContext(CartContext);
  return (
    <CartContainer $isVisible={isVisible}>
      <CartEscapeArea onClick={togleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        <CartTotal>Total: R${productsTotalPrice.toFixed(2)}</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
