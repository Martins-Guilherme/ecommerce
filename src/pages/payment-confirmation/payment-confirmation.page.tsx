import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent,
} from './payment-confirmation.styles';

import {
  AiOutlineHome,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

import Colors from '../../theme/theme.colors';
import Header from '../../components/header/header.component';
import CustomButton from '../../components/custom-button/custom-button.components';
import { useDispatch } from 'react-redux';
import { clearCartProducts } from '../../store/reducers/cart/cart.actions';

const PaymentConfirmationPage: FunctionComponent = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const status = searchParams.get('success');

  const isCanceled = searchParams.get('canceled') === 'true';

  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate('/');
  };

  useEffect(() => {
    if (status === 'true') {
      dispatch(clearCartProducts());
    }
  }, [status]);

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.success} />
              <p>Sua compra foi finalizada com sucesso.</p>
            </>
          )}
          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar a sua compra, por favor tente
                novamente.
              </p>
            </>
          )}
          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleReturnClick}
          >
            Ir para a página inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  );
};

export default PaymentConfirmationPage;
