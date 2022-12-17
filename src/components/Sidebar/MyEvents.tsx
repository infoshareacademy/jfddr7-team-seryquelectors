import { useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import { DD } from "../../react-app-env";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.scss";

const MyEvents: React.FC = () => {
  const { user, allEvents } = useContext(GlobalDataContext);
  const userEvents = allEvents.filter((e: DD) => e.email === user);

  return (
    <div className={styles.events}>
      <p className={styles.events__view}>Twoje wydarzenia ({userEvents.length}):</p>

      {userEvents.map((e: DD) => {
        return <EventCard key={e.id} id={e.id} />;
      })}
    </div>
  );
};

export default MyEvents;
