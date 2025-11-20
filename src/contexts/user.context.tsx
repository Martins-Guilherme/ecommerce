import { createContext, FunctionComponent, useState } from 'react';
import User from '../types/user-types';

interface IUserContext {
  currentUser: User | null;
  isAuthenticated: boolean;
  loginUser: (user: User) => void;
  logOutUser: () => void;
}

interface UserContextProviderProps {
  children: any;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logOutUser: () => {},
});

const UserContextProvider: FunctionComponent<UserContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = currentUser !== null;

  const loginUser = (user: User) => {
    setCurrentUser(user);
  };

  const logOutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
