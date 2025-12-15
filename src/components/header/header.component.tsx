import { BsCart3 } from 'react-icons/bs';

import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle,
} from './header.styles';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectProductsCount } from '../../store/reducers/cart/cart.sectors';

import { logoutUser } from '../../store/toolkit/user/user.slice';

import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { toogleCart } from '../../store/reducers/cart/cart.actions';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer,
  );

  const productsCount = useAppSelector(selectProductsCount);

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

  const handleSignOutClick = () => {
    dispatch(logoutUser() as any);
    signOut(auth);
  };

  const handleCartClick = () => {
    dispatch(toogleCart() as any);
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
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
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
