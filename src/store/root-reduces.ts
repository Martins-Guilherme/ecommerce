import { combineReducers } from 'redux';
import userReducer from './toolkit/user/user.slice';
import cartReducer from './reducers/cart/cart.reducer';
import categoryReducer from './reducers/category/category.reducer';

const rootReducer = combineReducers({
  categoryReducer,
  userReducer,
  cartReducer,
});

export default rootReducer;
