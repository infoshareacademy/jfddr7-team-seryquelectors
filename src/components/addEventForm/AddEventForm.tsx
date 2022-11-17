import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import styles from "./AddEventForm.module.css";

/* A */

const AddEventForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [participants, setParticipants] = useState([]);
  const { position, user, fetchEvents, allEvents, setPosition, setShowForm } = useContext(AuthContext);

  //   interface addForm {
  //     name: string;
  //     setName: (name: string) => void;
  //     description: string;
  //     setDescription: (name: string) => void;
  //   }

  const addEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const eventRef = doc(collection(db, "events"));
    console.log(eventRef);
    const { id } = eventRef;
    console.log(id);
    await setDoc(eventRef, {
      name: name,
      description: description,
      position: position,
      email: user,
      date: date,
      time: time,
      category: category,
      participants: participants,
      id: id,
    }).then((r) => console.log(r));
    setName("");
    setDescription("");
    setTime("");
    setDate("");
    setCategory("");
    setParticipants([]);
    setPosition([0, 0]);
    setShowForm(false);
    fetchEvents();
  };

  return (
    <div className={styles.FormWrapper}>
      {/* <input placeholder="latitude"></input>
        <input placeholder="longtitude"></input> */}
      <form onSubmit={addEvent} className={styles.form}>
        <input
          placeholder="imię"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />

        <select
          name="category"
          id="category-select"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option value="">Wybierz kategorię</option>
          <option value="sport">Sport</option>
          <option value="nauka">Nauka</option>
          <option value="kultura">Kultura</option>
        </select>
        <input
          placeholder="data"
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
          type="date"
          required
        />
        <input
          placeholder="godzina"
          onChange={(e) => {
            setTime(e.target.value);
          }}
          value={time}
          type="time"
          required
        />
        <textarea
          placeholder="opis"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          required
        />
        <button>Dodaj wydarzenie</button>
      </form>
    </div>
  );

};

export default AddEventForm;
