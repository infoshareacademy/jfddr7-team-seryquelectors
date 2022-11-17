import { addDoc, collection, DocumentData } from "firebase/firestore";
import { emit } from "process";
import { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { showForm, user, allEvents, fetchEvents } = useContext(AuthContext);
  const userEvents = allEvents.filter((e: DocumentData) => e.email === user);
  const participateEvents = allEvents.filter(
    (e: DocumentData) => e.participants?.indexOf(user) > -1
  );
  const otherEvents = allEvents.filter((e: DocumentData) => e.email !== user);
  // && e.team.indexOf(user) == -1

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={styles.SidebarWrapper}>
      {showForm ? <AddEventForm /> : null}
      <details>
        <summary>Twoje wydarzenia ({userEvents.length}):</summary>
        <>
          {userEvents.map((e: DocumentData) => {
            return (
              <EventCard
                name={e.name}
                category={e.category}
                description={e.description}
                date={e.date}
                time={e.time}
                email={e.email}
              />
            );
          })}
        </>
      </details>
      <details>
        <summary>Biorę udział w ({participateEvents.length}):</summary>
      </details>
      <details>
        <summary>Nadchodzące wydarzenia ({otherEvents.length}):</summary>
        {otherEvents.map((e: DocumentData) => {
          return (
            <EventCard
              name={e.name}
              category={e.category}
              description={e.description}
              date={e.date}
              time={e.time}
              email={e.email}
            />
          );
        })}
      </details>
    </div>
  );
};
