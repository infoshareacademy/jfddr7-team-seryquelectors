import { collection, getDocs, query, where } from "firebase/firestore";
import { ReactElement } from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import { EventData, UserData, UserJSON } from "../../react-app-env";
import { icons } from "../icons";
import styles from "./EventDetails.module.scss";

const EventDetails = (): ReactElement => {
  const { showDetails, setShowDetails } = useContext(GlobalDataContext);

  const [authorDescription, setAuthorDescription] = useState<null | string>(null);
  const [details, setDetails] = useState<EventData>({} as EventData);
  const { category, date, description, likes, name, participants, time } = details;

  useEffect(() => {
    //get 'fresh' event data from Firestore
    getDocs(query(collection(db, "events"), where("id", "==", showDetails))).then((querySnapshot) => {
      const eventData: EventData[] = [];
      querySnapshot.forEach((doc) => {
        eventData.push(doc.data() as EventData);
      });
      //when get, also fetch data about author
      getDocs(query(collection(db, "users"), where("email", "==", eventData[0].email))).then((querySnapshot) => {
        const userData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data() as UserData);
        });
        setAuthorDescription(userData[0].userDescription);
        setDetails(eventData[0]);
      });
    });
  }, []);
  return (
    <div className={styles.background} onClick={() => setShowDetails(null)}>
      <div className={styles.window}>
        <div className={styles.window__author}>
          <p>Autor:</p>
          {name}
          <p className={styles.window__aboutme}>O mnie: {authorDescription}</p>
        </div>

        <div className={styles.window__description}>
          <div className={styles.window__category}>Kategoria: {category}</div>

          <p className={styles.window__categoryheader}>Opis wydarzenia:</p>
          {description}
        </div>

        <div className={styles.window__participants}>
          Uczestnicy:
          <div className={styles.window__list}>
            {/* get stringified participants data, parse it and return as name + email */}
            {participants?.map((el, i) => {
              const { participantName, user } = JSON.parse(el) as UserJSON;
              return (
                <p key={i}>
                  {participantName} ({user})
                </p>
              );
            })}
          </div>{" "}
        </div>

        <div className={styles.window__date}>
          <p>Data startu:</p>
          {date}
        </div>

        <div className={styles.window__time}>
          <p>Godzina startu:</p>
          {new Date().getTime() < new Date(date + " " + time).getTime() ? time : "Wydarzenie jest w trakcie!"}
        </div>

        <div className={styles.window__likes}>
          <p>
            <img className={styles.window__img} src={icons[1]} alt="heart icon" /> Polubienia:
          </p>
          {likes?.length}
        </div>
      </div>
      <p className={styles.exit}>Naciśnij gdziekolwiek poza kartą, aby wyjść.</p>
    </div>
  );
};

export default EventDetails;
