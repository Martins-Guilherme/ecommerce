import { createContext, FunctionComponent, useState } from 'react';
import CartProduct from '../types/cart-types';

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  togleCart: () => void;
}

interface ICartProps {
  children: any;
}

const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  togleCart: () => {},
});

const CartContextProvider: FunctionComponent<ICartProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products] = useState<CartProduct[]>([]);

  const togleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <CartContext.Provider value={{ isVisible, products, togleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
