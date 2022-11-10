import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/HomePage/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/global";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const { user, setUser } = useContext(AuthContext);
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

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default App;
