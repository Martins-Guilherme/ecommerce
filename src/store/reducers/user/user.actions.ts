import User from '../../../types/user-types';
import UserActionType from './user.action-types';

interface LoginUserAction {
  type: typeof UserActionType.LOGIN;
  payload: User;
}

export const LoginUser = (payload: User): LoginUserAction => ({
  payload,
  type: UserActionType.LOGIN,
});

interface LogoutUserAction {
  type: typeof UserActionType.LOGOUT;
}

export const LogoutUser = (): LogoutUserAction => ({
  type: UserActionType.LOGOUT,
});

export type UserActions = LoginUserAction | LogoutUserAction;
