import { ReactElement, useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import { DD } from "../../react-app-env";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.scss";

const Events = (): ReactElement => {
  const { sidebar, showForm, user, allEvents, currentUser, filter, setFilter } = useContext(GlobalDataContext);

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
    <div className={styles.events}>
      {/* OUR EVENTS (CREATED BY US) */}
      {sidebar === "myEvents" ? (
        <>
          <p className={styles.events__view}>Twoje wydarzenia ({userEvents.length}):</p>

          {userEvents.map((e: DD) => {
            return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
          })}
        </>
      ) : null || sidebar === "eventsIParticipateIn" ? (
        // PARTICIPATED EVENTS
        <>
          <p className={styles.events__view}>Biorę udział w ({participateEvents.length}):</p>

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
  );
};

export default Events;
