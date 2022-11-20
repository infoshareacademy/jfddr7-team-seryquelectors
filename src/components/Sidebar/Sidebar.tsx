import { DocumentData } from "firebase/firestore";
import { useContext, useState, useEffect, SelectHTMLAttributes } from "react";
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
  const { showForm, user, allEvents, currentUser } = useContext(AuthContext);
  const [sidebar, setSidebar] = useState<string>("upcommingEvents");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("none");
  const userEvents = allEvents.filter((e: DocumentData) => e.email === user);
  const participateEvents = allEvents.filter(
    (e: DocumentData) =>
      e.participants.includes(currentUser.userJson) && e.email !== user
  );
  const otherEvents =
    filter == "none"
      ? allEvents
          .filter(
            (e: DocumentData) =>
              !e.participants.includes(currentUser.userJson) || e.email === user
          )
          .sort((a: DocumentData, b: DocumentData) => {
            return b.likes.length - a.likes.length;
          })
      : allEvents
          .filter(
            (e: DocumentData) =>
              (!e.participants.includes(currentUser.userJson) ||
                e.email === user) &&
              e.category.indexOf(filter) > -1
          )
          .sort((a: DocumentData, b: DocumentData) => {
            return b.likes.length - a.likes.length;
          });
  const handleRefresh = (): void => {
    setRefresh(!refresh);
  };
  // useEffect(() => {
  //   fetchEvents();
  // }, [allEvents.length, participateEvents.length, otherEvents.length]);

  return (
    <div className={styles.SidebarWrapper}>
      <div className={styles.options}>
        <div className={styles.user}>
          {/* <img src={images.find((image) => image.name === currentUser.avatar)?.src ?? ""} /> */}
        </div>
        <button
          onClick={() => {
            setSidebar("myEvents");
          }}
        >
          Moje wydarzenia
        </button>
        <button onClick={() => setSidebar("eventsIParticipateIn")}>
          Biorę udział w...
        </button>
        <button onClick={() => setSidebar("upcommingEvents")}>
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
                  creatorName={e.name}
                  category={e.category}
                  description={e.description}
                  date={e.date}
                  time={e.time}
                  email={e.email}
                  key={e.id}
                  id={e.id}
                  participants={e.participants}
                  likes={e.likes}
                  handleRefresh={handleRefresh}
                />
              );
            })}
          </>
        ) : null || sidebar === "eventsIParticipateIn" ? (
          <>
            <p>Biorę udział w ({participateEvents.length}):</p>
            {participateEvents.map((e: DocumentData) => {
              return (
                <EventCard
                  creatorName={e.name}
                  category={e.category}
                  description={e.description}
                  date={e.date}
                  time={e.time}
                  email={e.email}
                  key={e.id}
                  id={e.id}
                  participants={e.participants}
                  likes={e.likes}
                  handleRefresh={handleRefresh}
                />
              );
            })}
          </>
        ) : null}
        {sidebar === "upcommingEvents" ? (
          <>
            <p>Nadchodzące wydarzenia ({otherEvents.length}):</p>
            <p>Sortuj wg:</p>
            <select
              name="activitySort"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              value={filter}
            >
              <option value="none">Pokaż wszystkie</option>
              <option value="sport">🟢 Sport</option>
              <option value="nauka">🟣 Nauka</option>
              <option value="kultura">🟡 Kultura</option>
            </select>

            {otherEvents.map((e: DocumentData) => {
              return (
                <EventCard
                  other
                  creatorName={e.name}
                  category={e.category}
                  description={e.description}
                  date={e.date}
                  time={e.time}
                  email={e.email}
                  key={e.id}
                  id={e.id}
                  participants={e.participants}
                  likes={e.likes}
                  handleRefresh={handleRefresh}
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
