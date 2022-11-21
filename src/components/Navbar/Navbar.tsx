import styles from "./Navbar.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/global";
import { useState } from "react";
import { BurgerClose as Icon } from "react-icons-animated";
import { Sidebar } from "../Sidebar/Sidebar";

export const images = [
  { src: "../../image1.png", name: "image.png" },
  { src: "/image2.png", name: "image.png" },
  { src: "/image3.png", name: "image.png" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { setUser, currentUser, fetchUsers } = useContext(AuthContext);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.NavbarWrapper}>
      <button
        onClick={() => setIsClosed(!isClosed)}
        style={{
          margin: " 0px  0px  0px 20px ",
          background: "transparent",
          border: "none",
        }}
      >
        <Icon isClosed={isClosed} />
      </button>

      {isClosed ? <Sidebar /> : null}

      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="45px"
          viewBox="0 0 24 24"
          width="45px"
          fill="#FFFFFF"
        >
          <rect fill="none" height="45" width="45" />
          <path d="M11,14H9c0-4.97,4.03-9,9-9v2C14.13,7,11,10.13,11,14z M18,11V9c-2.76,0-5,2.24-5,5h2C15,12.34,16.34,11,18,11z M7,4 c0-1.11-0.89-2-2-2S3,2.89,3,4s0.89,2,2,2S7,5.11,7,4z M11.45,4.5h-2C9.21,5.92,7.99,7,6.5,7h-3C2.67,7,2,7.67,2,8.5V11h6V8.74 C9.86,8.15,11.25,6.51,11.45,4.5z M19,17c1.11,0,2-0.89,2-2s-0.89-2-2-2s-2,0.89-2,2S17.89,17,19,17z M20.5,18h-3 c-1.49,0-2.71-1.08-2.95-2.5h-2c0.2,2.01,1.59,3.65,3.45,4.24V22h6v-2.5C22,18.67,21.33,18,20.5,18z" />
        </svg>
        GoGather
      </h1>

      <div className={styles.logoutAvatarWrapper}>
        <div className={styles.avatarWrapper}>
          <img alt="user avatar" src={currentUser.avatar} />
          <p>{currentUser.name}</p>
        </div>
        <svg
          onClick={() => {
            signOut(auth);
            setUser(null);
            navigate("/");
          }}
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          viewBox="0 0 24 24"
          width="35px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
      </div>
    </div>
  );
};
