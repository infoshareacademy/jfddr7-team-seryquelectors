import { FC, ReactElement, useContext } from "react";
import styles from "./EventCard.module.css";
import { AuthContext } from "../../providers/global";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
interface Props {
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  email: string;
  participants: string[];
  id: string;
}

const EventCard = ({
  name,
  category,
  description,
  date,
  time,
  email,
  participants,
  id,
}: Props): ReactElement => {
  const { user } = useContext(AuthContext);

  const handleJoin = async (key: string) => {
    return null;
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "events", `${id}`));
  };

  const handleLeave = async (id: string): Promise<void> => {
    const docReference = doc(db, "events", `${id}`);
    console.log(docReference.id);
    // await setDoc(doc(db, "events", `${key}`), { participants: participants.filter((el) => el !== email) });
  };

  return (
    <div className={styles.eventCard}>
      <p className={styles.eventName}>{name}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.detailsWrapper}>
        <p className={styles.date}>{date}</p>
        <p className={styles.time}>{time}</p>

        {email !== user ? (
          <button onClick={() => handleJoin(id)}>Dołącz</button>
        ) : null}
        {/* {participants.indexOf(email) > -1 && email !== user ? <button onClick={() => handleLeave(key)}>Opuść</button> : null} */}
        {/* {email === user ? <button onClick={() => handleDelete(key)}>Usuń</button> : null} */}
        <button onClick={() => handleLeave(id)}>Opuść</button>
      </div>
    </div>
  );
};

export default EventCard;
