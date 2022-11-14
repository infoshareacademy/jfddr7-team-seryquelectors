import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/HomePage/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/global";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";

function App() {
  const { user, setUser, allEvents, setAllEvents } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u.email);
        navigate("home");
      } else {
        navigate("/");
      }
    });
  }, []);

  const fetchEvents = (): void => {
    getDocs(collection(db, "events")).then((querySnapshot) => {
      const events: object[] = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      setAllEvents(events);
      console.log(events);
    });
  };

  useEffect(() => fetchEvents(), []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
