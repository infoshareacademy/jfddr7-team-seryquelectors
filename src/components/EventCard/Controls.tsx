import { useContext } from "react";
import { GlobalDataContext } from "../../providers/global";
import styles from "./EventCard.module.scss";
import { icons } from "../icons";
import { deleteDoc, doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  email: string;
  participants: string[];
  id: string;
  likes: string[];
}

const Controls: React.FC<Props> = ({ email, participants, id, likes }: Props) => {
  const { user, currentUser, setShowDetails } = useContext(GlobalDataContext);
  const docRef: DocumentReference = doc(db, "events", `${id}`);

  // binary handle of like button
  const handleLike = async (): Promise<void> => {
    if (likes.indexOf(user as string) === -1) {
      await updateDoc(docRef, { likes: [user, ...likes] });
    } else {
      await updateDoc(docRef, { likes: likes.filter((e) => e !== user) });
    }
  };

  //modify Array of participants
  const handleJoin = async (): Promise<void> => {
    await updateDoc(docRef, {
      participants: [...participants, currentUser.userJson],
    });
  };

  //delete  from Firestore whole doc from reference
  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Potwierdź usunięcie wybranego wydarzenia.")) {
      await deleteDoc(docRef);
    }
  };

  //remove userData from proper document
  const handleLeave = async (): Promise<void> => {
    const fetchDocument = (await getDoc(docRef)).data();
    const currentParticipants = fetchDocument?.participants;
    await updateDoc(docRef, {
      participants: currentParticipants.filter((e: string) => e !== currentUser.userJson),
    });
  };

  return (
    <>
      {!participants.includes(currentUser.userJson) && email !== user ? (
        <button onClick={handleJoin} className={styles["eventcard__button--join"]}>
          <img className={styles.eventcard__img} src={icons[2]} alt="waving hand" />
          Dołącz
        </button>
      ) : null}
      <div className={styles.eventcard__controls}>
        <button className={styles.eventcard__button} title="Liczba uczestników i szczegóły" onClick={() => setShowDetails(id)}>
          <img className={styles.eventcard__img} src={icons[0]} alt="people holding hands" />
          {participants.length}
        </button>
        <button onClick={handleLike} className={likes.includes(user as string) ? styles["eventcard__button--liked"] : styles["eventcard__button"]} title="Lubię to!">
          <img className={styles.eventcard__img} src={icons[1]} alt="red heart" />
          {likes.length}
        </button>
        {participants.includes(currentUser.userJson) && email !== user ? (
          <button onClick={handleLeave} className={styles.eventcard__button}>
            🚫 Opuść
          </button>
        ) : null}
        {email === user ? (
          <button onClick={handleDelete} className={styles.eventcard__button}>
            <img className={styles.eventcard__img} src={icons[3]} alt="bin" />
            Usuń
          </button>
        ) : null}
      </div>{" "}
    </>
  );
};

export default Controls;
