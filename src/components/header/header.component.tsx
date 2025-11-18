import { BsCart3 } from 'react-icons/bs';
import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle,
} from './header.styles';

import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';

const Header = () => {
  const navigate = useNavigate();

  const handleCreateAcount = () => {
    navigate('/sign-up');
  };

  const handleExploreClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleCreateAcount}>Criar conta</HeaderItem>
        <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />{' '}
          <span style={{ fontSize: 12, marginLeft: 5 }}>5</span>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
