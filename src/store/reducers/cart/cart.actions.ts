import Product from '../../../types/products-types';
import CartActionType from './cart.action-types';

export const toogleCart = () => ({
  type: CartActionType.toogleCart,
});

export const addProductToCart = (payload: Product) => ({
  type: CartActionType.addProductToCart,
  payload,
});
