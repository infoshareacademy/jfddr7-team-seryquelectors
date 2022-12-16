import AddEventForm from "../addEventForm/AddEventForm";
import styles from "./Sidebar.module.scss";

const NewEvent  : React.FC = () => {
  return (
    <div className={styles.events}>
      showForm ? (
    <AddEventForm />
  ) : (
    <div className={styles.events__view}>Proszę, kliknij na mapę i wybierz miejsce spotkania</div>
  )
    </div>
  );
};

export default NewEvent;
