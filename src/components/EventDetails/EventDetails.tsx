import { useContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { AuthContext } from "../../providers/global";
import styles from "./EventDetails.module.css";

interface Props {
  creatorName: string;
  category: string;
  description: string;
  date: string;
  time: string;
  email: string;
  participants: string[];
  id: string;
  likes: string[];
  setShowMore: Dispatch<SetStateAction<boolean>>;
}

interface UserJSON {
  participantName: string;
  user: string;
}

const EventDetails = ({ creatorName, category, description, date, time, email, participants, id, likes, setShowMore }: Props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.mainContainer} onClick={() => setShowMore(false)}>
      <div className={styles.window}>
        <div className={styles.author}>
          <p>Autor:</p>
          {creatorName}
        </div>
        <div className={styles.category}>
          <p>Kategoria</p>
          {category}
        </div>
        <div className={styles.description}>
          <p>Opis wydarzenia:</p>
          {description}
        </div>
        <div className={styles.participants}>
          Uczestnicy:
          <div className={styles.participantsList}>
            {participants.map((el, i) => {
              const parsedUserJSON = JSON.parse(el) as UserJSON;
              return (
                <p key={i}>
                  {parsedUserJSON.participantName} ({parsedUserJSON.user})
                </p>
              );
            })}
          </div>{" "}
        </div>
        <div className={styles.date}>
          <p>Data startu:</p>
          {date}
        </div>
        <div className={styles.time}>
          <p>Godzina startu:</p>
          {new Date().getTime() < new Date(date + " " + time).getTime() ? time : "Trwa!"}
        </div>
        <div className={styles.likes}>
          <p>Polubienia:</p>
          {likes.length}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
