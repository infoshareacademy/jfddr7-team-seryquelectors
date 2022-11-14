import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  interface addForm {
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (name: string) => void;
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { position, setPosition } = useContext(AuthContext);

  const addEvent = async (): Promise<void> => {
    await addDoc(collection(db, "events"), {
      name: name,
      description: description,
      position: position,
    });
  };

  return (
    <div className={styles.SidebarWrapper}>
      <form>
        {/* <input placeholder="latitude"></input>
        <input placeholder="longtitude"></input> */}
        <input
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        ></input>
        <input
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(description);
          }}
        ></input>
        <button onClick={addEvent}>Add Event</button>
      </form>
    </div>
  );
};
