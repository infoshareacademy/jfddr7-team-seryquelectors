import styles from "./Navbar.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Hamburger from "../Hamburger/Hamburger";
import { GlobalDataContext } from "../../providers/global";
import { ReactElement } from "react";

export const Navbar = (): ReactElement => {
  const navigate = useNavigate();
  const { setUser, currentUser, isClosed, fetchUsers } = useContext(GlobalDataContext);

  useEffect(() => fetchUsers());

  const handleLogOut = (): void => {
    signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__switch}>
        <Hamburger />
      </div>
      {isClosed ? <Sidebar /> : null}
      <h1 className={styles.navbar__logo}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="45px" viewBox="0 0 24 24" width="45px" fill="#FFFFFF">
          <rect fill="none" height="45" width="45" />
          <path d="M11,14H9c0-4.97,4.03-9,9-9v2C14.13,7,11,10.13,11,14z M18,11V9c-2.76,0-5,2.24-5,5h2C15,12.34,16.34,11,18,11z M7,4 c0-1.11-0.89-2-2-2S3,2.89,3,4s0.89,2,2,2S7,5.11,7,4z M11.45,4.5h-2C9.21,5.92,7.99,7,6.5,7h-3C2.67,7,2,7.67,2,8.5V11h6V8.74 C9.86,8.15,11.25,6.51,11.45,4.5z M19,17c1.11,0,2-0.89,2-2s-0.89-2-2-2s-2,0.89-2,2S17.89,17,19,17z M20.5,18h-3 c-1.49,0-2.71-1.08-2.95-2.5h-2c0.2,2.01,1.59,3.65,3.45,4.24V22h6v-2.5C22,18.67,21.33,18,20.5,18z" />
        </svg>
        GoGather
      </h1>
      <div className={styles.navbar__user}>
        {currentUser?.userJson ? (
          <>
            <img className={styles.navbar__avatar} alt="user avatar" src={currentUser.avatar} />
            <p>{currentUser.name}</p>

            <svg className={styles.navbar__logout} onClick={handleLogOut} xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="#FFFFFF">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </>
        ) : (
          <button className={styles.navbar__button} onClick={() => navigate("/")}>
            Dołącz!
          </button>
        )}
      </div>
    </div>
  );
};
