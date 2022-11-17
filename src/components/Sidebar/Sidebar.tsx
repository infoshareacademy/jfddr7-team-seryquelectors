import { addDoc, collection, DocumentData } from "firebase/firestore";
import { emit } from "process";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const { showForm, user, allEvents } = useContext(AuthContext);
  const userEvents = allEvents.filter((e: DocumentData) => e.email === user);
  // const participateEvents = allEvents.filter((e: DocumentData) => e.team.indexOf(user) > -1);
  const otherEvents = allEvents.filter((e: DocumentData) => e.email !== user);
  // && e.team.indexOf(user) == -1

  const [sidebar, setSidebar] = useState<any>("upcommingEvents");
  // useEffect(() => {}, []);

  return (
    <div className={styles.SidebarWrapper}>
      <div className={styles.options}>
        <div className={styles.user}>
          <p>Wojciech Lamperski</p>
          <img src="#" />
        </div>
        <button
          onClick={() => {
            setSidebar("myEvents");
          }}
        >
          Moje wydarzenia
        </button>
        <button
          onClick={() => {
            setSidebar("eventsIParticipateIn");
          }}
        >
          Biorę udział w...
        </button>
        <button
          onClick={() => {
            setSidebar("upcommingEvents");
          }}
        >
          Nadchodzące wydarzenia
        </button>
        <button
          onClick={() => {
            setSidebar("addEvent");
          }}
        >
          Dodaj wydarzenie
        </button>
      </div>

      <div className={styles.events}>
        {sidebar === "myEvents" ? (
          <>
            <p>Twoje wydarzenia ({userEvents.length}):</p>

            {userEvents.map((e: DocumentData) => {
              return (
                <EventCard
                  name={e.name}
                  category={e.category}
                  description={e.description}
                  date={e.date}
                  time={e.time}
                  email={e.email}
                  key={e.id}
                  id={e.id}
                  participants={e.participants}
                />
              );
            })}
          </>
        ) : null || sidebar === "eventsIParticipateIn" ? (
          <details>
            <summary>Biorę udział w (0):</summary>
          </details>
        ) : null}
        {sidebar === "upcommingEvents" ? (
          <>
            <p>Nadchodzące wydarzenia ({otherEvents.length}):</p>
            {otherEvents.map((e: DocumentData) => {
              return (
                <EventCard
                  name={e.name}
                  category={e.category}
                  description={e.description}
                  date={e.date}
                  time={e.time}
                  email={e.email}
                  key={e.id}
                  id={e.id}
                  participants={e.participants}
                />
              );
            })}
          </>
        ) : null || sidebar === "addEvent" ? (
          <>
            {showForm ? (
              <AddEventForm />
            ) : (
              <p>Proszę wybierz miejsce spotkania</p>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
