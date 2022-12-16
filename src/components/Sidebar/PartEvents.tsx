import { useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import { DD } from "../../react-app-env";
import EventCard from "../EventCard/EventCard";
import styles from "./Sidebar.module.scss";

const PartEvents  : React.FC = () => {
  const {  user, allEvents, currentUser } = useContext(GlobalDataContext);
  const participateEvents = allEvents.filter((e: DD) => e.participants.includes(currentUser.userJson) && e.email !== user);

  return (
    <div className={styles.events}>
      <p className={styles.events__view}>Biorę udział w ({participateEvents.length}):</p>

{participateEvents.map((e: DD) => {
  return <EventCard creatorName={e.name} category={e.category} description={e.description} date={e.date} time={e.time} email={e.email} key={e.id} id={e.id} participants={e.participants} likes={e.likes} />;
})}
    </div>
  );
};

export default PartEvents;