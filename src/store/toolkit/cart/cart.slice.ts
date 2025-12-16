import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CartProduct from '../../../types/cart-types';
import Product from '../../../types/products-types';

interface IInitialState {
  isVisible: boolean;
  products: CartProduct[];
}

const initialState: IInitialState = {
  isVisible: false,
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toogleCart: (state) => {
      state.isVisible = !state.isVisible;
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const productIsAlreadInCart = state.products.some(
        (item) => item.id === product.id,
      );
      // Se tiver o produto no carrinho add + 1
      if (productIsAlreadInCart) {
        state.products = state.products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return;
      }
      // Se não tiver, retorna apenas 1 unidade para o produto
      state.products = [...state.products, { ...product, quantity: 1 }];
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    increaseCartProductQuantity: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    },
    decreaseCartProductQuantity: (state, action: PayloadAction<string>) => {
      state.products = state.products
        .map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0);
    },
    clearCartProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProductToCart,
  clearCartProducts,
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart,
  toogleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
