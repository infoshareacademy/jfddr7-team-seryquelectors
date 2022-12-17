import { ReactElement, useContext } from "react";
import styles from "./EventCard.module.scss";
import { GlobalDataContext } from "../../providers/global";
import Controls from "./Controls";
import { EventData, DD } from "../../react-app-env";

interface Props {
  id: string;
  other?: boolean;
}

const EventCard = ({ id, other }: Props): ReactElement => {
  const { user, allEvents } = useContext(GlobalDataContext);
  const { name, category, description, date, time, email, participants, likes } = allEvents.find((el: DD) => el.id === id) as EventData;

  const compareTime: boolean = new Date().getTime() < new Date(date + " " + time).getTime();
  return (
    <>
      <div className={styles.eventcard}>
        <p className={styles.eventcard__author}>
          {name} {email === user && other ? "(Ty)" : null}
          <span className={styles.category}>{category}</span>
        </p>

        <p className={styles.eventcard__description}>{description}</p>
        <div className={styles.eventcard__details}>
          <p className={styles.eventcard__dateinfo}>
            {date} <span>{compareTime ? time : "Trwa!"}</span>
          </p>
          {user ? <Controls email={email} id={id} participants={participants} likes={likes} /> : null}
        </div>
      </div>
    </>
  );
};

export default EventCard;
