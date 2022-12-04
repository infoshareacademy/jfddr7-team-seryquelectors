import { collection, doc, DocumentReference, setDoc } from "firebase/firestore";
import { LatLngExpression, setOptions } from "leaflet";
import { FormEvent, SetStateAction, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import styles from "./AddEventForm.module.scss";

interface NewEvent {
  name: string;
  description: string;
  position: LatLngExpression;
  email: string | null;
  date: string;
  time: string;
  category: string;
  participants: string[];
  likes: string[];
  id: string;
}

const AddEventForm = () => {
  const { position, setSidebar, user, setShowForm, currentUser } = useContext(GlobalDataContext);

  //suggest to add event which starts in one hour
  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() < 10 && "0"}${new Date().getDate()}`;
  let initTime: number | string = new Date().getTime();
  // slice stands for throw out seconds from time string
  initTime = new Date(initTime + 3600000).toLocaleTimeString().slice(0, -3);

  const eventRef: DocumentReference = doc(collection(db, "events"));
  const { id } = eventRef;
  const [formData, setFormData] = useState<NewEvent>({
    name: currentUser.name,
    description: "",
    position: position,
    email: user,
    date: currentDate,
    time: initTime,
    category: "",
    participants: [currentUser.userJson],
    likes: [],
    id: id,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, position: position }));
  }, [position]);

  const addEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setShowForm(false);
    setSidebar("myEvents");
    await setDoc(doc(db, "events", formData.id), formData);
  };

  return (
    <form onSubmit={addEvent} className={styles.addform}>
      <select className={styles.addform__element} name="category" id="category-select" onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, category: e.target.value }))} value={formData.category} required>
        <option value="">Wybierz kategorię</option>
        <option value="🟢 sport">🟢 Sport</option>
        <option value="🟣 nauka">🟣 Nauka</option>
        <option value="🟡 kultura">🟡 Kultura</option>
      </select>
      <input className={styles.addform__element} onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, date: e.target.value }))} value={formData.date} type="date" required />
      <input className={styles.addform__element} onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, time: e.target.value }))} value={formData.time} type="time" required />
      <textarea className={styles.addform__textarea} onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, description: e.target.value }))} value={formData.description} required maxLength={300} placeholder="Krótko opisz wydarzenie" />
      <button className={styles.addform__button}>Dodaj wydarzenie</button>
    </form>
  );
};

export default AddEventForm;
