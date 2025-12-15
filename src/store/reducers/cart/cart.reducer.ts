import CartProduct from '../../../types/cart-types';
import CartActionType from './cart.action-types';
import { CartActions } from './cart.actions';

export interface InitialState {
  isVisible: boolean;
  products: CartProduct[];
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
};

const cartReducer = (
  state = initialState,
  action: CartActions,
): InitialState => {
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
    case CartActionType.removeProductFromCart:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id != action.payload,
        ),
      };
    case CartActionType.increaseCartProductQuantity:
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };
    case CartActionType.decreaseCartProductQuantity:
      return {
        ...state,
        products: state.products
          .map((product) =>
            product.id === action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product,
          )
          .filter((product) => product.quantity > 0),
      };
    case CartActionType.clearCartProducts:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
