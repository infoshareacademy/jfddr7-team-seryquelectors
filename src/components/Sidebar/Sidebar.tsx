import { addDoc, collection, DocumentData } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { showForm, user, allEvents } = useContext(AuthContext);
  const userEvents = allEvents.filter((e: DocumentData) => e.email === user);
  return (
    <div className={styles.SidebarWrapper}>
      {showForm ? <AddEventForm /> : null}
      <details>
        <summary>Twoje wydarzenia ({userEvents.length}):</summary>
        <>
          {userEvents.map((event: DocumentData) => {
            return (
              <div className={styles.eventCard}>
                <p className={styles.eventName}>{event.name}</p>
                <p className={styles.category}>{event.category}</p>
                <p className={styles.description}>{event.description}</p>
                <div className={styles.detailsWrapper}>
                  <p className={styles.date}>{event.date}</p>
                  <p className={styles.time}>{event.time}</p>
                  <details>
                    <summary>Pokaż adres e-mail:</summary>
                    <p className={styles.email}>{event.email}</p>
                  </details>
                </div>
              </div>
            );
          })}
        </>
      </details>
      <details>
        <summary>Biorę udział w (0):</summary>
      </details>
      <details>
        <summary>Nadchodzące wydarzenia (0):</summary>
        {}
      </details>
    </div>
  );
};
