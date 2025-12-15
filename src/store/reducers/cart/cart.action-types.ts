const CartActionType = {
  toogleCart: 'cart/toogle' as const,
  addProductToCart: 'cart/addProduct' as const,
  removeProductFromCart: 'cart/removeProduct' as const,
  increaseCartProductQuantity: 'cart/increaseCartProductQuantity' as const,
  decreaseCartProductQuantity: 'cart/decreaseCartProductQuantity' as const,
  clearCartProducts: 'cart/clearProducts' as const,
  register: 'register' as const,
};

export default CartActionType;
