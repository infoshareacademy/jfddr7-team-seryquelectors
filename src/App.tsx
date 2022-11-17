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
  const { user, setUser, fetchEvents } = useContext(AuthContext);
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

  useEffect(() => {
    fetchEvents();
  }, []);

  if (user) {
    return (
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
