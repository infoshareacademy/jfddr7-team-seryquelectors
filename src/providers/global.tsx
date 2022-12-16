import { createContext, useState, FC, ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import { collection, DocumentData, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContextState, UserData } from "../react-app-env";

interface AuthProviderProps {
  children: ReactNode;
}

export const GlobalDataContext = createContext({} as AuthContextState);

export const GlobalDataProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>("");
  const [position, setPosition] = useState<LatLngExpression>([54.352024, 18.646639]);
  const [allEvents, setAllEvents] = useState<object[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [userDescription, setUserDescription] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);
  const [filter, setFilter] = useState<string>("none");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  //real time refresh
  onSnapshot(collection(db, "events"), (qS) => {
    let events: object[] = [];
    qS.forEach((doc) => {
      events.push(doc.data());
    });
    // do not fetch events older than hour
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

  return <GlobalDataContext.Provider value={{ user, setUser, position, setPosition, allEvents, setAllEvents, showForm, setShowForm, userDescription, setUserDescription, fetchUsers, currentUser, setCurrentUser, filter, setFilter, setShowDetails, showDetails, isClosed, setIsClosed }}>{children}</GlobalDataContext.Provider>;
};
