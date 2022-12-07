import { useContext } from "react";
import { ReactElement } from "react";
import { GlobalDataContext } from "../../providers/global";
import styles from "./Sidebar.module.scss";

const Options = (): ReactElement => {
  const { sidebar, setSidebar } = useContext(GlobalDataContext);
  return (
    <div className={styles.options}>
      <button className={sidebar === "myEvents" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("myEvents")}>
        Moje wydarzenia
      </button>
      <button className={sidebar === "eventsIParticipateIn" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("eventsIParticipateIn")}>
        Biorę udział w...
      </button>
      <button className={sidebar === "upcommingEvents" ? styles["options__button--active"] : styles.options__button} onClick={() => setSidebar("upcommingEvents")}>
        Nadchodzące wydarzenia
      </button>
      <button className={sidebar === "addEvent" ? styles["options__button--active"] : styles["options__button--add"]} onClick={() => setSidebar("addEvent")}>
        Dodaj wydarzenie
      </button>
    </div>
  );
};

export default Options;
