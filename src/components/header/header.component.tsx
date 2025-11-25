import { BsCart3 } from 'react-icons/bs';

import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle,
} from './header.styles';

import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);
  const { togleCart, productsCount } = useContext(CartContext);

  const handleCartClick = () => {
    togleCart();
  };

  const handleHomePageClick = () => {
    navigate('/');
  };

  const handleExploreClick = () => {
    navigate('/explorer');
  };

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleHomePageClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />{' '}
          <span style={{ fontSize: 12, marginLeft: 5 }}>{productsCount}</span>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
