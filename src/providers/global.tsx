import React, { createContext, useState, FC, ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
interface AuthContextState {
  user: string | null;
  setUser: (user: string | null) => void;
  position: LatLngExpression;
  setPosition: (position: LatLngExpression) => void;
  allEvents: object[];
  setAllEvents: (event: object[]) => void;
  showForm: boolean;
  setShowForm: (e: boolean) => void;
  fetchEvents: () => void;
  name: string | null;
  setName: (user: string | null) => void;
  userDescription: string | null;
  setUserDescription: (user: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContextValue = {} as AuthContextState;

export const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [allEvents, setAllEvents] = useState<object[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState<string | null>("");
  const [userDescription, setUserDescription] = useState<string | null>("");

  const fetchEvents = (): void => {
    getDocs(collection(db, "events")).then((querySnapshot) => {
      const events: object[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      setAllEvents(events);
      console.log("a");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        position,
        setPosition,
        allEvents,
        setAllEvents,
        showForm,
        setShowForm,
        fetchEvents,
        name,
        setName,
        userDescription,
        setUserDescription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
