import { DocumentData } from "firebase/firestore";
import { useContext, useState } from "react";
import { GlobalDataContext } from "../../providers/global";
import AddEventForm from "../addEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.css";

type DD = DocumentData;

export const Sidebar = () => {
  const { showForm, user, allEvents, currentUser, filter, setFilter } = useContext(GlobalDataContext);

  const [sidebar, setSidebar] = useState<string>("upcommingEvents");

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
    <div className={styles.SidebarWrapper}>
      <div className={styles.options}>
        <button onClick={() => setSidebar("myEvents")}>Moje wydarzenia</button>
        <button onClick={() => setSidebar("eventsIParticipateIn")}>Biorę udział w...</button>
        <button onClick={() => setSidebar("upcommingEvents")}>Nadchodzące wydarzenia</button>
        <button onClick={() => setSidebar("addEvent")}>Dodaj wydarzenie</button>
      </div>

      <div className={styles.events}>
        {/* OUR EVENTS (CREATED BY US) */}
        {sidebar === "myEvents" ? (
          <>
            <div className={styles.filter}>Twoje wydarzenia ({userEvents.length}):</div>

            {userEvents.map((e: DD) => {
              return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "eventsIParticipateIn" ? (
          // PARTICIPATED EVENTS
          <>
            <div className={styles.filter}>Biorę udział w ({participateEvents.length}):</div>

            {participateEvents.map((e: DD) => {
              return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null}
        {/* // ALL EVENTS IN GDANSK (INCL. ADDED BY YOU) */}
        {sidebar === "upcommingEvents" ? (
          <>
            <div className={styles.filter}>
              <span>Nadchodzące wydarzenia ({otherEvents.length}):</span>
              <br />
              <div className={styles.spanSelect}>
                <select name="activitySort" onChange={(e) => setFilter(e.target.value)} value={filter}>
                  <option value="none">Pokaż wszystkie</option>
                  <option value="sport">🟢 Sport</option>
                  <option value="nauka">🟣 Nauka</option>
                  <option value="kultura">🟡 Kultura</option>
                </select>
              </div>
            </div>

            {otherEvents.map((e: DD) => {
              return <EventCard other creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
            })}
          </>
        ) : null || sidebar === "addEvent" ? (
          <>{showForm ? <AddEventForm setSidebar={setSidebar} /> : <div className={styles.filter}>Proszę kliknij na mapę i wybierz miejsce spotkania</div>}</>
        ) : null}
      </div>
    </div>
  );
};
