import CartProduct from '../../../types/cart-types';
import CartActionType from './cart.action-types';

export interface InitialState {
  isVisible: boolean;
  productsTotalPrice: number;
  productsCount: number;
  products: CartProduct[];
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
  productsTotalPrice: 0,
  productsCount: 0,
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CartActionType.toogleCart:
      return { ...state, isVisible: !state.isVisible };
    case CartActionType.addProductToCart: {
      // Verificar se o produto está no carrinho
      const product = action.payload;
      const productIsAlreadInCart = state.products.some(
        (item) => item.id === product.id,
      );
      // Se tiver o produto no carrinho add + 1
      if (productIsAlreadInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      // Se não tiver, retorna apenas 1 unidade para o produto
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      };
    }
    default:
      return { ...state };
  }
};

export default cartReducer;
