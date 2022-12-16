import { ReactElement, useContext } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { GlobalDataContext } from "../../providers/global";
import AllEvents from "./AllEvents";
import MyEvents from "./MyEvents";
import NewEvent from "./NewEvent";
import PartEvents from "./PartEvents";
import styles from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const { user } = useContext(GlobalDataContext);
  return (
    <div className={styles.sidebar}>
      {user && (
        <div className={styles.options}>
          <>
            <NavLink className={({ isActive }) => (isActive ? styles["options__button--active"] : styles.options__button)} to="my">
              Moje wydarzenia
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles["options__button--active"] : styles.options__button)} to="taken">
              Biorę udział w...
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles["options__button--active"] : styles.options__button)} to="upcomming">
              Nadchodzące wydarzenia
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? styles["options__button--active"] : styles.options__button)} to="add">
              Dodaj wydarzenie
            </NavLink>
          </>
        </div>
      )}
      {user ? (
        <Routes>
          <Route path="my" element={<MyEvents />} />
          <Route path="taken" element={<PartEvents />} />
          <Route path="upcomming" element={<AllEvents />} />
          <Route path="add" element={<NewEvent />} />
        </Routes>
      ) : (
        <AllEvents />
      )}
    </div>
  );
};
