import {
  HTMLAttributes,
  ReactElement,
  ReactPropTypes,
  useContext,
  useState,
} from "react";
import styles from "./EventCard.module.css";
import { AuthContext } from "../../providers/global";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EventDetails from "../EventDetails/EventDetails";
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

const EventCard = ({
  creatorName,
  category,
  description,
  date,
  time,
  email,
  participants,
  id,
  likes,
  other,
}: Props): ReactElement => {
  const { user, currentUser, showMore, setShowMore } = useContext(AuthContext);

  const peopleIcon =
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/314/people-holding-hands-light-skin-tone-medium-dark-skin-tone_1f9d1-1f3fb-200d-1f91d-200d-1f9d1-1f3fe.png";
  const likeIcon =
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/327/red-heart_2764-fe0f.png";
  const joinIcon =
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/326/waving-hand_1f44b.png";

  const handleLike = async () => {
    const docRef = doc(db, "events", `${id}`);
    if (likes.indexOf(user as string) === -1) {
      await updateDoc(docRef, { likes: [user, ...likes] });
    } else {
      await updateDoc(docRef, { likes: likes.filter((e) => e !== user) });
    }
  };

  const handleJoin = async () => {
    const docRef = doc(db, "events", `${id}`);
    await updateDoc(docRef, {
      participants: [...participants, currentUser.userJson],
    });
  };

  const handleDelete = async (): Promise<void> => {
    await deleteDoc(doc(db, "events", `${id}`));
  };

  const handleLeave = async (): Promise<void> => {
    const docRef = doc(db, "events", `${id}`);
    const fetchDocument = (await getDoc(docRef)).data();
    const currentParticipants = fetchDocument?.participants;
    await updateDoc(docRef, {
      participants: currentParticipants.filter(
        (e: string) => e !== currentUser.userJson
      ),
    });
  };

  return (
    <>
      <div className={styles.eventCard}>
        <p className={styles.eventName}>
          <span>
            {creatorName} {email === user && other ? <span>(Ty)</span> : null}
          </span>
          <span className={styles.category}>{category}</span>
        </p>

        <p className={styles.description}>{description}</p>
        <div className={styles.detailsWrapper}>
          <p className={styles.date}>{date}</p>
          <p className={styles.time}>
            {new Date().getTime() < new Date(date + " " + time).getTime()
              ? time
              : "Trwa!"}
          </p>
          <button
            className={styles.cardButton}
            title="Liczba uczestników i szczegóły"
            onClick={() => setShowMore(true)}
          >
            <img src={peopleIcon} alt="people holding hands" />
            {participants.length}
          </button>
          <button
            onClick={handleLike}
            className={styles.cardButton}
            title="Lubię to!"
          >
            <img src={likeIcon} alt="red heart" />
            {likes.length}
          </button>
          {!participants.includes(currentUser.userJson) && email !== user ? (
            <button onClick={handleJoin} className={styles.cardButton}>
              <img src={joinIcon} alt="waving hand" />
              Dołącz
            </button>
          ) : null}
          {participants.includes(currentUser.userJson) && email !== user ? (
            <button onClick={handleLeave} className={styles.cardButton}>
              🚫 Opuść
            </button>
          ) : null}
          {email === user ? (
            <button onClick={handleDelete} className={styles.cardButton}>
              <img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/toss-face/342/wastebasket_1f5d1-fe0f.png"
                alt="bin"
              />
              Usuń
            </button>
          ) : null}
        </div>
      </div>

      {showMore ? (
        <EventDetails
          creatorName={creatorName}
          category={category}
          description={description}
          date={date}
          time={time}
          email={email}
          id={id}
          participants={participants}
          likes={likes}
          setShowMore={setShowMore}
        />
      ) : null}
    </>
  );
};

export default EventCard;
