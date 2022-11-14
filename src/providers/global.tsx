import React, { createContext, useState, FC, ReactNode } from "react";
import { LatLngExpression } from "leaflet";

interface AuthContextState {
  user: string | null;
  setUser: (user: string | null) => void;
  position: LatLngExpression;
  setPosition: (position: LatLngExpression) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContextValue = {} as AuthContextState;

export const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);

  return (
    <AuthContext.Provider value={{ user, setUser, position, setPosition }}>
      {children}
    </AuthContext.Provider>
  );
};
