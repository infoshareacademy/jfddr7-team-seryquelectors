import { collection, getDocs, query, where } from "firebase/firestore";
import { LatLngExpression } from "leaflet";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import { icons } from "../icons";
import styles from "./EventDetails.module.css";

interface Props {
  id: string;
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

interface EventData {
  category: string;
  date: string;
  description: string;
  email: string;
  id: string;
  likes: string[];
  name: string;
  participants: string[];
  position: LatLngExpression;
  time: string;
}
const EventDetails = () => {
  const { showDetails, setShowDetails } = useContext(GlobalDataContext);

  const [authorDescription, setAuthorDescription] = useState<null | string>(null);
  const [details, setDetails] = useState<EventData>({} as EventData);

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
    <div className={styles.mainContainer} onClick={() => setShowDetails(null)}>
      <div className={styles.window}>
        <div className={styles.author}>
          <p>Autor:</p>
          {details.name}
          <p className={styles.aboutMe}>O mnie: {authorDescription}</p>
        </div>
        <div className={styles.category}>
          <p>Kategoria</p>
          {details.category}
        </div>
        <div className={styles.description}>
          <p>Opis wydarzenia:</p>
          {details.description}
        </div>
        <div className={styles.participants}>
          Uczestnicy:
          <div className={styles.participantsList}>
            {/* get stringified participants data, parse it and return as name + email */}
            {details.participants?.map((el, i) => {
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
          {details.date}
        </div>
        <div className={styles.time}>
          <p>Godzina startu:</p>
          {new Date().getTime() < new Date(details.date + " " + details.time).getTime() ? details.time : "Wydarzenie jest w trakcie!"}
        </div>
        <div className={styles.likes}>
          <p>
            <img src={icons[1]} alt="heart icon" />
            Polubienia:
          </p>
          {details.likes?.length}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
