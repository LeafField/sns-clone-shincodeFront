import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import apiClient from "../lib/apiclient";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  user: null | UserData["user"];
}

type AuthProviderProps = {
  children: ReactNode;
};

type UserData = {
  user: {
    id: number;
    email: string;
    username: string;
  };
};

const authContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData["user"] | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      apiClient
        .get<UserData>("users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    try {
      apiClient
        .get<UserData>("users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
  };
  const value = {
    user,
    login,
    logout,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
