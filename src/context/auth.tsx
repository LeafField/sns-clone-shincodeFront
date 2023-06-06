import React, { ReactNode, createContext, useContext } from "react";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

const authContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };
  const value = {
    login,
    logout,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
