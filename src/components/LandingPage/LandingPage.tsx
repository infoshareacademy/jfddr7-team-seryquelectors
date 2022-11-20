import styles from "./LandingPage.module.css";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../providers/global";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDefaultResultOrder } from "dns";

export const LandingPage = () => {
  const navigate = useNavigate();
  // const [login, setLogin] = useState('')
  // const [password, setPassword] = useState('')

  // const onLogin = () => {
  //     const user = { login, password };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  const { setUser, setName, setUserDescription, name, userDescription } =
    useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("home");
        setUser(email);
      })
      .catch(({ message }) => {
        if (message == "Firebase: Error (auth/wrong-password).") {
          setError("Niepoprawny email lub hasło");
        }
        // } else {
        //   createUserWithEmailAndPassword(auth, email, password)
        //     .then(() => {
        //       navigate("home");
        //       setUser(email);
        //     })
        //     .catch(() => {
        //       setError("Wystąpił błąd");
        //     });
        // }
      });
  };

  const addUser = async (): Promise<void> => {
    await addDoc(collection(db, "users"), {
      name: name,
      avatar: url,
      userDescription: userDescription,
      email: email,
    });
  };

  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (url) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("home");
          setUser(email);
          addUser();
        })
        .catch(() => {
          setError("Wystąpił błąd");
        });
    } else {
      setError("Proszę dodaj zdjęcie");
    }
  };

  const toogleLoginButton = () => {
    setShowLogin(!showLogin);
  };

  //Profile image

  const [imageUpload, setImageUpload] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + Math.random()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error in the image url");
          });
        imageUpload(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //

  return (
    <div className={styles.wrapper}>
      <div className={styles.about}>
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
        <h2>Łatwiejsze spotkania w Gdańsku</h2>
        <p>
          Szukasz towarzysza do wspólnej aktywności? Dobrze trafiłeś! <br />{" "}
          Niezależnie od tego czy chcesz iść poćwiczyć na siłownię czy szukasz
          przyjaciela do wspólnej nauki, <br /> GoGather ma dla ciebie
          towarzysza.
        </p>
      </div>
      <div className={styles.formWrapper}>
        <h1>Proszę zaloguj się</h1>
        <form>
          <input
            type="email"
            placeholder="Wpisz email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Wpisz hasło"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showLogin ? (
            <>
              <button type="submit" onClick={handleLogin}>
                Zaloguj
              </button>
              <a onClick={toogleLoginButton} className={styles.toogleButton}>
                Nie masz konta? Zarejestruj się
              </a>
            </>
          ) : (
            <>
              <input
                placeholder="Wpisz imię"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                placeholder="Napiszesz coś o sobie?"
                className={styles.textarea}
                onChange={(e) => setUserDescription(e.target.value)}
                required
              />
              <label>Dodaj zdjęcie profilowe</label>

              {/* Profile image */}
              <div className={styles.addImage}>
                <div className="avatarInputAndButton">
                  <input
                    type="file"
                    name="avatar"
                    onChange={(event: any) => {
                      event.preventDefault();
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                  <h1 onClick={uploadImage}>Dodaj</h1>
                </div>
                {url ? (
                  <img className={styles.avatar} alt="Avatar" src={url} />
                ) : (
                  <img
                    className={styles.avatar}
                    alt="Avatar"
                    src="https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"
                  />
                )}
              </div>
              <button type="submit" onClick={handleRegister}>
                Zarejestruj
              </button>
              <a onClick={toogleLoginButton} className={styles.toogleButton}>
                Masz już konto? Zaloguj się
              </a>
            </>
          )}
          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </div>
    </div>
  );
};
