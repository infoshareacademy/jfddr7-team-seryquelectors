import { FC, ReactElement, useContext } from "react";
import styles from "./EventCard.module.css";
import { AuthContext } from "../../providers/global";
import { deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
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

const EventCard = ({ name, category, description, date, time, email, participants, id }: Props): ReactElement => {
  const { user, fetchEvents } = useContext(AuthContext);

  const handleJoin = async (key: string) => {
    const docRef = doc(db, "events", `${id}`);
    await updateDoc(docRef, { participants: [user, ...participants] });
    fetchEvents();
    console.log("join!");
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "events", `${id}`));
    fetchEvents();
    console.log("deleted!");
  };

  const handleLeave = async (id: string): Promise<void> => {
    const docRef = doc(db, "events", `${id}`);
    const fetchDocument = (await getDoc(docRef)).data();
    const currentParticipants = fetchDocument?.participants;
    await updateDoc(docRef, { participants: currentParticipants.filter((el: string) => el !== user) });
    fetchEvents();
    console.log("leaved!");
  };

  return (
    <div className={styles.eventCard}>
      <p className={styles.eventName}>{name}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.detailsWrapper}>
        <p className={styles.date}>{date}</p>
        <p className={styles.time}>{time}</p>
        {participants.indexOf(user as string) == -1 && email !== user ? <button onClick={() => handleJoin(id)}>Dołącz</button> : null}
        {participants.indexOf(user as string) > -1 && email !== user ? <button onClick={() => handleLeave(id)}>Opuść</button> : null}
        {email === user ? <button onClick={() => handleDelete(id)}>Usuń</button> : null}
      </div>
    </div>
  );
};

export default EventCard;
