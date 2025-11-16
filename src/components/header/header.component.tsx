import { BsCart3 } from 'react-icons/bs';
import './header.style.css';
import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle,
} from './header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar conta</HeaderItem>
        <HeaderItem>
          <BsCart3 size={25} />{' '}
          <span style={{ fontSize: 12, marginLeft: 5 }}>5</span>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  );
};

export default Header;
