import { ReactElement, useContext, useState } from "react";
import styles from "./EventCard.module.scss";
import { GlobalDataContext } from "../../providers/global";
import { deleteDoc, doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Controls from "./Controls";

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
  other?: boolean;
}

const EventCard = ({ creatorName, category, description, date, time, email, participants, id, likes, other }: Props): ReactElement => {
  const { user, currentUser, setShowDetails } = useContext(GlobalDataContext);
  const compareTime: boolean = new Date().getTime() < new Date(date + " " + time).getTime();

  return (
    <>
      <div className={styles.eventcard}>
        <p className={styles.eventcard__author}>
          {creatorName} {email === user && other ? "(Ty)" : null}
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
