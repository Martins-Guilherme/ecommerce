import { FunctionComponent } from 'react';
import { BsCartCheck } from 'react-icons/bs';

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

import { useAppSelector } from '../../hooks/redux.hooks';
import { useDispatch } from 'react-redux';
import { toogleCart } from '../../store/toolkit/cart/cart.slice';

import {
  selectProductsCount,
  selectProductsTotalPrice,
} from '../../store/reducers/cart/cart.sectors';

const Cart: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { isVisible, products } = useAppSelector((state) => state.cartReducer);

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);
  const productsCount = useAppSelector(selectProductsCount);

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    dispatch(toogleCart());
    navigate('/checkout');
  };

  const handleScapeAreaClick = () => {
    dispatch(toogleCart());
  };

  return (
    <CartContainer $isVisible={isVisible}>
      <CartEscapeArea onClick={handleScapeAreaClick} />
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
