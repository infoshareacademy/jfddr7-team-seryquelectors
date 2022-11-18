import { addDoc, collection, DocumentData } from "firebase/firestore";
import { emit } from "process";
import { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.css";

// export const images = [
//   { src: "../../image1.png", name: "image.png" },
//   { src: "/image2.png", name: "image.png" },
//   { src: "/image3.png", name: "image.png" },
// ];

export const Sidebar = () => {
  const { showForm, user, allEvents, fetchEvents } = useContext(AuthContext);
  const userEvents = allEvents.filter((e: DocumentData) => e.email === user);
  const participateEvents = allEvents.filter((e: DocumentData) => e.participants.filter((el: string) => el.indexOf(user as string) > -1));
  const otherEvents = allEvents
    .filter((e: DocumentData) => e.participants.filter((el: string) => el.indexOf(user as string) === -1))
    .sort((a: DocumentData, b: DocumentData) => {
      return b.likes.length - a.likes.length;
    });

  const [sidebar, setSidebar] = useState<any>("upcommingEvents");
  useEffect(() => {
    fetchEvents();
  }, [allEvents.length, participateEvents.length, otherEvents.length]);

  return (
    <div className={styles.SidebarWrapper}>
      <div className={styles.options}>
        <div className={styles.user}>{/* <img src={images.find((image) => image.name === currentUser.avatar)?.src ?? ""} /> */}</div>
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
              return <EventCard creatorName={e.creatorName} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "eventsIParticipateIn" ? (
          <>
            <p>Biorę udział w ({participateEvents.length}):</p>
            {participateEvents.map((e: DocumentData) => {
              return <EventCard creatorName={e.creatorName} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null}
        {sidebar === "upcommingEvents" ? (
          <>
            <p>Nadchodzące wydarzenia ({otherEvents.length}):</p>
            {otherEvents.map((e: DocumentData) => {
              return <EventCard creatorName={e.creatorName} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "addEvent" ? (
          <>{showForm ? <AddEventForm /> : <p>Proszę wybierz miejsce spotkania</p>}</>
        ) : null}
      </div>
    </div>
  );
};
