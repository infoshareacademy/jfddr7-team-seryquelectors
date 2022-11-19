import { collection, doc, setDoc } from "firebase/firestore";
import { FormEvent, useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import styles from "./AddEventForm.module.css";
// import emailjs from "@emailjs/browser";

/* A */

// const sendEmail = (e) => {
//   e.preventDefault();

//   emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY").then(
//     (result) => {
//       console.log(result.text);
//     },
//     (error) => {
//       console.log(error.text);
//     }
//   );
// };

const AddEventForm = () => {
  // const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const { position, user, fetchEvents, setPosition, setShowForm, currentUser } = useContext(AuthContext);

  const addEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const eventRef = doc(collection(db, "events"));
    const { id } = eventRef;
    await setDoc(eventRef, {
      name: currentUser.name,
      description: description,
      position: position,
      email: user,
      date: date,
      time: time,
      category: category,
      participants: [currentUser.userJson],
      likes: [],
      id: id,
    });

    setDescription("");
    setTime("");
    setDate("");
    setCategory("");
    setPosition([0, 0]);
    setShowForm(false);
    fetchEvents();
  };

  return (
    <div className={styles.FormWrapper}>
      {/* <input placeholder="latitude"></input>
        <input placeholder="longtitude"></input> */}
      <form onSubmit={addEvent} className={styles.form}>
        <select
          name="category"
          id="category-select"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          required
        >
          <option value="">Wybierz kategorię</option>
          <option value="🟢 sport">🟢 Sport</option>
          <option value="🟣 nauka">🟣 Nauka</option>
          <option value="🟡 kultura">🟡 Kultura</option>
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
          maxLength={300}
        />
        <button>Dodaj wydarzenie</button>
      </form>
    </div>
  );
};

export default AddEventForm;
