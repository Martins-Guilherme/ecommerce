import Product from '../../../types/products-types';
import CartActionType from './cart.action-types';

interface IToggleCartAction {
  type: typeof CartActionType.toogleCart;
}
export const toogleCart = (): IToggleCartAction => ({
  type: CartActionType.toogleCart,
});

interface IAddProductToCartAction {
  type: typeof CartActionType.addProductToCart;
  payload: Product;
}
export const addProductToCart = (
  payload: Product,
): IAddProductToCartAction => ({
  type: CartActionType.addProductToCart,
  payload,
});

interface IRemoveProductFromCartAction {
  type: typeof CartActionType.removeProductFromCart;
  payload: string;
}
export const removeProductFromCart = (
  payload: string,
): IRemoveProductFromCartAction => ({
  type: CartActionType.removeProductFromCart,
  payload,
});

interface IIncreaseCartProductQuantityAction {
  type: typeof CartActionType.increaseCartProductQuantity;
  payload: string;
}
export const increaseCartProductQuantity = (
  payload: string,
): IIncreaseCartProductQuantityAction => ({
  type: CartActionType.increaseCartProductQuantity,
  payload,
});

interface IDecreaseCartProductQuantityAction {
  type: typeof CartActionType.decreaseCartProductQuantity;
  payload: string;
}
export const decreaseCartProductQuantity = (
  payload: string,
): IDecreaseCartProductQuantityAction => ({
  type: CartActionType.decreaseCartProductQuantity,
  payload,
});

interface IClearCartProductsAction {
  type: typeof CartActionType.clearCartProducts;
}
export const clearCartProducts = (): IClearCartProductsAction => ({
  type: CartActionType.clearCartProducts,
});

export type CartActions =
  | IToggleCartAction
  | IAddProductToCartAction
  | IRemoveProductFromCartAction
  | IIncreaseCartProductQuantityAction
  | IDecreaseCartProductQuantityAction
  | IClearCartProductsAction;
