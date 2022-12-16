/// <reference types="react-scripts" />
import { LatLngExpression } from "leaflet";

interface NewEvent {
  name: string;
  description: string;
  position: LatLngExpression;
  email: string | null;
  date: string;
  time: string;
  category: string;
  participants: string[];
  likes: string[];
  id: string;
}

interface UserData {
  avatar: undefined | string;
  email: string;
  name: string;
  userDescription: string;
  userJson: string;
}

interface UserJSON {
  participantName: string;
  user: string;
}

interface EventData {
  category: string;
  date: string;
  description: string;
  email: string;
  id: string;
  likes: string[];
  name: string;
  participants: string[];
  position: LatLngExpression;
  time: string;
}

interface AuthContextState {
  user: string | null;
  setUser: (user: string | null) => void;
  position: LatLngExpression;
  setPosition: (position: LatLngExpression) => void;
  allEvents: object[];
  setAllEvents: (event: object[]) => void;
  showForm: boolean;
  setShowForm: (e: boolean) => void;
  userDescription: string | null;
  setUserDescription: (user: string | null) => void;
  fetchUsers: () => void;
  currentUser: UserData;
  setCurrentUser: (event: UserData) => void;
  filter: string;
  setFilter: (a: string) => void;
  showDetails: string | null;
  setShowDetails: (a: string | null) => void;
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
  

type DD = DocumentData;
