import { collection, doc, DocumentReference, setDoc } from "firebase/firestore";
import { LatLngExpression } from "leaflet";
import { FormEvent, SetStateAction, useContext, useState } from "react";
import { db } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import styles from "./AddEventForm.module.css";

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
interface Props {
  setSidebar: (arg: SetStateAction<string>) => void;
}
const AddEventForm = ({ setSidebar }: Props) => {
  const { position, user, setShowForm, currentUser } = useContext(GlobalDataContext);

  //suggest to add event which starts in one hour
  const currentDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
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

  const addEvent = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setShowForm(false);
    setSidebar("myEvents");
    await setDoc(doc(db, "events", formData.id), formData);
  };

  return (
    <div className={styles.FormWrapper}>
      <form onSubmit={addEvent} className={styles.form}>
        <select name="category" id="category-select" onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, category: e.target.value }))} value={formData.category} required>
          <option value="">Wybierz kategorię</option>
          <option value="🟢 sport">🟢 Sport</option>
          <option value="🟣 nauka">🟣 Nauka</option>
          <option value="🟡 kultura">🟡 Kultura</option>
        </select>
        <input onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, date: e.target.value }))} value={formData.date} type="date" required />
        <input onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, time: e.target.value }))} value={formData.time} type="time" required />
        <textarea onChange={(e) => setFormData((prev: NewEvent) => ({ ...prev, description: e.target.value }))} value={formData.description} required maxLength={300} placeholder="Krótko opisz wydarzenie" />
        <button>Dodaj wydarzenie</button>
      </form>
    </div>
  );
};

export default AddEventForm;
