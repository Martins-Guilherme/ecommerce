import User from '../../../types/user-types';
import UserActionType from './user.action-types';

export const LoginUser = (payload: User) => ({
  payload,
  type: UserActionType.LOGIN,
});

export const Logout = () => ({ type: UserActionType.LOGOUT });
