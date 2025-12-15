import { FunctionComponent, ReactElement, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../header/header.component';
import Loading from '../loading/loading.component';
import { useSelector } from 'react-redux';

interface AuthenticationProps {
  children: ReactElement;
}

const AuthenticationGuard: FunctionComponent<AuthenticationProps> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message="Você precisa estar logado para acessar está página. Você será redirecionado para a página de login em instantes..." />
      </>
    );
  }

  return <>{children}</>;
};

export default AuthenticationGuard;
