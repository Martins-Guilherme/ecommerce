import User from '../../../types/user-types';
import UserActionType from './user.action-types';
import { UserActions } from './user.actions';

interface InitialState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (
  state = initialState,
  action: UserActions,
): InitialState => {
  switch (action.type) {
    case UserActionType.LOGIN:
      console.log('teste entrada login_User');
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case UserActionType.LOGOUT:
      return { ...state, currentUser: null, isAuthenticated: false };
    default:
      return { ...state };
  }
};

export default userReducer;
