import React, { createContext, useState, FC, ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import { collection, DocumentData, getDocs, onSnapshot, query, where } from "firebase/firestore";
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
  name: string | null;
  setName: (user: string | null) => void;
  userDescription: string | null;
  setUserDescription: (user: string | null) => void;
  fetchUsers: () => void;
  currentUser: UserData;
  setCurrentUser: (event: UserData) => void;
  filter: string;
  setFilter: (a: string) => void;
  showDetails: string | null;
  setShowDetails: (a: string | null) => void;
  sidebar: string;
  setSidebar: (a: string) => void;
  isClosed: boolean;
  setIsClosed: (arg: boolean) => void;
}

interface UserData {
  avatar: undefined | string;
  email: string;
  name: string;
  userDescription: string;
  userJson: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const GlobalDataContext = createContext({} as AuthContextState);

export const GlobalDataProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");
  const [position, setPosition] = useState<LatLngExpression>([54.352024, 18.646639]);
  const [allEvents, setAllEvents] = useState<object[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState<string | null>("");
  const [userDescription, setUserDescription] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);
  const [filter, setFilter] = useState<string>("none");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState<string>("upcommingEvents");
  const [isClosed, setIsClosed] = useState<boolean>(false);

  onSnapshot(collection(db, "events"), (qS) => {
    let events: object[] = [];
    qS.forEach((doc) => {
      events.push(doc.data());
    });
    events = events.filter((e: DocumentData) => new Date().getTime() < new Date(e.date + " " + e.time).getTime() + 3600000);
    if (events.length !== allEvents.length) {
      setAllEvents(events);
    }
  });

  const fetchUsers = (): void => {
    getDocs(query(collection(db, "users"), where("email", "==", user))).then((querySnapshot) => {
      const user: UserData[] = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.data() as UserData);
      });
      setCurrentUser(user[0]);
    });
  };

  return (
    <GlobalDataContext.Provider
      value={{
        user,
        setUser,
        position,
        setPosition,
        allEvents,
        setAllEvents,
        showForm,
        setShowForm,
        name,
        setName,
        userDescription,
        setUserDescription,
        fetchUsers,
        currentUser,
        setCurrentUser,
        filter,
        setFilter,
        setShowDetails,
        showDetails,
        sidebar,
        setSidebar,
        isClosed,
        setIsClosed,
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};
