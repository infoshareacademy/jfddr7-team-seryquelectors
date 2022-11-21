import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
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

interface UserData {
  avatar: undefined | string;
  email: string;
  name: string;
  userDescription: string;
  userJson: string;
}

interface UserJSON {
  participantName: string;
  user: string;
}

const EventDetails = ({
  creatorName,
  category,
  description,
  date,
  time,
  email,
  participants,
  id,
  likes,
  setShowMore,
}: Props) => {
  const { currentUser, setCurrentUser, user } = useContext(AuthContext);
  const [authorDescription, setAuthorDescription] = useState<null | string>(
    null
  );

  useEffect(() => {
    getDocs(query(collection(db, "users"), where("email", "==", email))).then(
      (querySnapshot) => {
        const userData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data() as UserData);
        });
        setAuthorDescription(userData[0].userDescription);
      }
    );
  }, []);

  const likeIcon =
    "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/327/red-heart_2764-fe0f.png";

  return (
    <div className={styles.mainContainer} onClick={() => setShowMore(false)}>
      <div className={styles.window}>
        <div className={styles.author}>
          <p>Autor:</p>
          {creatorName}
          <p className={styles.aboutMe}>O mnie: {authorDescription}</p>
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
          {new Date().getTime() < new Date(date + " " + time).getTime()
            ? time
            : "Wydarzenie jest w trakcie!"}
        </div>
        <div className={styles.likes}>
          <p>
            <img src={likeIcon} alt="bin" />
            Polubienia:
          </p>
          {likes.length}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
