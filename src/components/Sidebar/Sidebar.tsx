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
  const { position, user } = useContext(AuthContext);

  const addEvent = async (e: any): Promise<void> => {
    e.preventDefault();
    await addDoc(collection(db, "events"), {
      name: name,
      description: description,
      position: position,
      email: user,
    });
  };

  return (
    <div className={styles.SidebarWrapper}>
      {/* <input placeholder="latitude"></input>
        <input placeholder="longtitude"></input> */}
      <form onSubmit={addEvent}>
        <input
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        />
        <input
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
            console.log(description);
          }}
        />
        <button>Add Event</button>
      </form>
    </div>
  );
};
