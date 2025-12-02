import { FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
import Loading from '../loading/loading.component';

const Checkout: FunctionComponent = () => {
  const { productsTotalPrice, products } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        {
          products,
        },
      );

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate('/');
  };
  return (
    <>
      <CheckoutContainer>
        {isLoading && <Loading />}
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
            <CustomButton
              onClick={handleFinishPurchaseClick}
              startIcon={<BsBagCheck />}
            >
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
