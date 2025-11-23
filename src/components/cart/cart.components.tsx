import { FunctionComponent, useContext } from 'react';
import { BsCartCheck } from 'react-icons/bs';

import { CartContext } from '../../contexts/cart.context';

import CustomButton from '../custom-button/custom-button.components';

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
} from './cart.styles';

const Cart: FunctionComponent = () => {
  const { isVisible, togleCart } = useContext(CartContext);
  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={togleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {/* Produtos */}

        <CartTotal>Total: R$25.55</CartTotal>
        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
