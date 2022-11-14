import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { showForm, setShowForm } = useContext(AuthContext);
  return (
    <div className={styles.SidebarWrapper}>
      {showForm ? <AddEventForm /> : null}
    </div>
  );
};
