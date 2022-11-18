import React, { createContext, useState, FC, ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  fetchUsers: () => void;
  currentUser: UserData;
  setCurrentUser: (event: UserData) => void;
}

interface UserData {
  avatar: null;
  email: string;
  name: string;
  userDescription: string;
  userJson: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContextValue = {} as AuthContextState;

export const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");
  const [position, setPosition] = useState<LatLngExpression>([54.352024, 18.646639]);
  const [allEvents, setAllEvents] = useState<object[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState<string | null>("");
  const [userDescription, setUserDescription] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);

  const fetchEvents = (): void => {
    console.log("fetch events");
    getDocs(collection(db, "events")).then((querySnapshot) => {
      const events: object[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      setAllEvents(events);
    });
  };

  const fetchUsers = (): void => {
    console.log("fetch users");
    getDocs(query(collection(db, "users"), where("email", "==", user))).then((querySnapshot) => {
      const user: UserData[] = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.data() as UserData);
      });
      setCurrentUser(user[0]);
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
        fetchUsers,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
