import { FC, ReactElement, useContext } from "react";
import styles from "./EventCard.module.css";
import { AuthContext } from "../../providers/global";
interface Props {
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  email: string;
}

const EventCard = ({
  name,
  category,
  description,
  date,
  time,
  email,
}: Props): ReactElement => {
  const { user } = useContext(AuthContext);

  // const handleJoin = (): void => {};

  return (
    <div className={styles.eventCard}>
      <p className={styles.eventName}>{name}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.detailsWrapper}>
        <p className={styles.date}>{date}</p>
        <p className={styles.time}>{time}</p>
        {/* {email !== user ? <button onClick={handleJoin}>Dołącz</button> : null} */}
      </div>
    </div>
  );
};

export default EventCard;
