import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/HomePage/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/global";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";



function App() {
  const { user, setUser, fetchEvents, allEvents } = useContext(AuthContext);
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
  }, [allEvents.length]);

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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
