import { createContext, FunctionComponent, useState } from 'react';
import CartProduct from '../types/cart-types';
import Product from '../types/products-types';

interface ICartContext {
  isVisible: boolean;
  products: CartProduct[];
  togleCart: () => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
}

interface ICartProps {
  children: any;
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  togleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

const CartContextProvider: FunctionComponent<ICartProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  const togleCart = () => {
    setIsVisible((prevState) => !prevState);
  };

  const addProductToCart = (product: Product) => {
    // Verificar se o produto esta no carrinho
    const productIsAlreadyInCart = products.some(
      (item) => item.id === product.id,
    );
    // Se o produto estiver no carrinho, soma o valor anterior mais uma unidade
    if (productIsAlreadyInCart) {
      return setProducts((products) =>
        products.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    }
    // Se o produto não estiver no carrinho adiciona 1
    setProducts((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        togleCart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
