import React from 'react';
import { useQuery } from 'react-query';
import { User } from '../types';
import { mainAxios } from '../utils';

export interface ContextInterface {
  isAuth: boolean;
  user: User | undefined;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const userContextDefault: ContextInterface = {
  isAuth: false,
  user: undefined,
  setIsAuth: () => {},
  setUser: () => {},
};

export const UserContext =
  React.createContext<ContextInterface>(userContextDefault);

export interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [isAuth, setIsAuth] = React.useState(
    localStorage.getItem('token') != null
  );
  const [user, setUser] = React.useState<User>();

  const { data } = useQuery('user', () => {
    return mainAxios.get('/account');
  });

  React.useEffect(() => {
    setUser(data?.data);
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
