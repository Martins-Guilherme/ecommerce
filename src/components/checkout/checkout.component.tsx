import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsAirplaneEngines, BsBagCheck } from 'react-icons/bs';

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles';

import CustomButton from '../custom-button/custom-button.components';
import CartItem from '../cart-item/cart-item.component';
import Loading from '../loading/loading.component';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectProductsTotalPrice } from '../../store/reducers/cart/cart.sectors';

const Checkout: FunctionComponent = () => {
  const { products } = useAppSelector((state) => state.cartReducer);
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice);

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
