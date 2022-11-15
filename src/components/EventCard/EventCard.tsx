import { FC, ReactElement } from "react";
import styles from "./EventCard.module.css";

interface Props {
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  email: string;
}

const EventCard = ({ name, category, description, date, time, email } : Props): ReactElement => {
  return (
    <div className={styles.eventCard}>
      <p className={styles.eventName}>{name}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.detailsWrapper}>
        <p className={styles.date}>{date}</p>
        <p className={styles.time}>{time}</p>
        <details>
          <summary>Pokaż adres e-mail:</summary>
          <p className={styles.email}>{email}</p>
        </details>
      </div>
    </div>
  );
};

export default EventCard;