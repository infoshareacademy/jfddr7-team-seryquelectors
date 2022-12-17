import { collection, doc, DocumentReference, setDoc } from "firebase/firestore";
import { ReactElement } from "react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import { NewEvent } from "../../react-app-env";
import styles from "./AddEventForm.module.scss";

const AddEventForm = (): ReactElement => {
  const { position, user, setShowForm, currentUser } = useContext(GlobalDataContext);

  let defaultTime: string | number = new Date().getTime() + 3600000;
  defaultTime = new Date(defaultTime).toLocaleTimeString().slice(0, -3);

  const navigate = useNavigate();
  const eventRef: DocumentReference = doc(collection(db, "events"));
  const { id } = eventRef;
  const [formData, setFormData] = useState<NewEvent>({
    name: currentUser.name,
    description: "",
    position: position,
    email: user,
    date: new Date().toLocaleDateString("en-CA"),
    time: defaultTime,
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
    navigate("/home/my");
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
