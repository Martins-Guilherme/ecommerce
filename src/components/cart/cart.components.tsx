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
import { useNavigate } from 'react-router-dom';

const Cart: FunctionComponent = () => {
  const { isVisible, togleCart, products, productsTotalPrice, productsCount } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    togleCart();
    navigate('/checkout');
  };

  return (
    <CartContainer $isVisible={isVisible}>
      <CartEscapeArea onClick={togleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice.toFixed(2)}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            onClick={handleCheckoutClick}
            startIcon={<BsCartCheck />}
          >
            Ir para o checkout
          </CustomButton>
        )}

        {productsCount === 0 && <p>Seu carrinho esta vazio!</p>}
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
