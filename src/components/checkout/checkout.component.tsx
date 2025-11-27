import { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsAirplaneEngines, BsBagCheck } from 'react-icons/bs';

import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles';

import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../cart-item/cart-item.component';

const Checkout: FunctionComponent = () => {
  const { productsTotalPrice, products } = useContext(CartContext);

  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate('/');
  };
  return (
    <>
      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>

        <CheckoutProducts>
          {products.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </CheckoutProducts>

        {products.length > 0 ? (
          <>
            <CheckoutTotal>
              Total: R${productsTotalPrice.toFixed(2)}
            </CheckoutTotal>
            <CustomButton startIcon={<BsBagCheck />}>
              Finalizar compra
            </CustomButton>
          </>
        ) : (
          <CustomButton
            startIcon={<BsAirplaneEngines />}
            onClick={handleReturnClick}
          >
            Voltar as compras
          </CustomButton>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
