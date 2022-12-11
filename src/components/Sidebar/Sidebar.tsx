import { DocumentData } from "firebase/firestore";
import { useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.scss";

type DD = DocumentData;

export const Sidebar = () => {
  const { sidebar, setSidebar, showForm, user, allEvents, currentUser, filter, setFilter } = useContext(GlobalDataContext);

  const userEvents = allEvents.filter((e: DD) => e.email === user);
  const participateEvents = allEvents.filter((e: DD) => e.participants.includes(currentUser.userJson) && e.email !== user);
  const otherEvents =
    filter === "none"
      ? allEvents
          .filter((e: DD) => !e.participants.includes(currentUser.userJson) || e.email === user)
          .sort((a: DD, b: DD) => {
            return b.likes.length - a.likes.length;
          })
      : allEvents
          .filter((e: DD) => (!e.participants.includes(currentUser.userJson) || e.email === user) && e.category.indexOf(filter) > -1)
          .sort((a: DD, b: DD) => {
            return b.likes.length - a.likes.length;
          });

  return (
    <div className={styles.sidebar}>
      <div className={styles.options}>
        <button className={sidebar === "myEvents" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("myEvents")}>
          Moje wydarzenia
        </button>
        <button className={sidebar === "eventsIParticipateIn" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("eventsIParticipateIn")}>
          Biorę udział w...
        </button>
        <button className={sidebar === "upcommingEvents" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("upcommingEvents")}>
          Nadchodzące wydarzenia
        </button>
        <button className={sidebar === "addEvent" ? styles["options__button--active"] : styles["options__button--add"]} onClick={() => setSidebar("addEvent")}>
          Dodaj wydarzenie
        </button>
      </div>

      <div className={styles.events}>
        {/* OUR EVENTS (CREATED BY US) */}
        {sidebar === "myEvents" ? (
          <>
            <div className={styles.events__view}>Twoje wydarzenia ({userEvents.length}):</div>

            {userEvents.map((e: DD) => {
              return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "eventsIParticipateIn" ? (
          // PARTICIPATED EVENTS
          <>
            <div className={styles.events__view}>Biorę udział w ({participateEvents.length}):</div>

            {participateEvents.map((e: DD) => {
              return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null}
        {/* // ALL EVENTS IN GDANSK (INCL. ADDED BY YOU) */}
        {sidebar === "upcommingEvents" ? (
          <>
            <div className={styles.events__view}>
              <span className={styles.events__selectlabel}>Nadchodzące wydarzenia ({otherEvents.length}):</span>
              <br />
              <select className={styles.events__select} name="activitySort" onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="none">Pokaż wszystkie</option>
                <option value="sport">🟢 Sport</option>
                <option value="nauka">🟣 Nauka</option>
                <option value="kultura">🟡 Kultura</option>
              </select>
            </div>

            {otherEvents.map((e: DD) => {
              return <EventCard other creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "addEvent" ? (
          showForm ? (
            <AddEventForm />
          ) : (
            <div className={styles.events__view}>Proszę, kliknij na mapę i wybierz miejsce spotkania</div>
          )
        ) : null}
      </div>
    </div>
  );
};
