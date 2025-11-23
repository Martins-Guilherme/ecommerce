import { createContext, FunctionComponent, useState } from 'react';
import CartProduct from '../types/cart-types';
import Product from '../types/products-types';

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  togleCart: () => void;
  addProductToCart: (product: Product) => void;
}

interface ICartProps {
  children: any;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  togleCart: () => {},
  addProductToCart: () => {},
});

const CartContextProvider: FunctionComponent<ICartProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const togleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Product) => {
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
    return 1;
  };

  return (
    <CartContext.Provider
      value={{ isVisible, products, togleCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
