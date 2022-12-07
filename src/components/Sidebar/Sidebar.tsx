import { ReactElement } from "react";
import Events from "./Events";
import Options from "./Options";
import styles from "./Sidebar.module.scss";

export const Sidebar = (): ReactElement => {
  return (
    <div className={styles.sidebar}>
      <Options />
      <Events />
    </div>
  );
};
