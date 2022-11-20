import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/HomePage/Home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./providers/global";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";

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

  if (user) {
    return (
      <>
        <Routes>
          <Route path="home" element={<Home />} />
        </Routes>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
