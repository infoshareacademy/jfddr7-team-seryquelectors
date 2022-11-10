import React, { createContext, useState, FC, ReactNode } from "react";

interface AuthContextState {
  user: string | null;
  setUser: (user: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContextValue = {} as AuthContextState;

export const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
