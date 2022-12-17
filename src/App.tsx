import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/HomePage/Home";
import { useContext, useEffect } from "react";
import { GlobalDataContext } from "./providers/global";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";
import EventDetails from "./components/EventDetails/EventDetails";

function App() {
  const { setUser, showDetails, fetchUsers } = useContext(GlobalDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u.email);
        navigate("home");
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home/*" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showDetails ? <EventDetails /> : null}
      <Footer />
    </>
  );
}

export default App;
