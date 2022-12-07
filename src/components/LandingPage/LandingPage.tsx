import styles from "./LandingPage.module.scss";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { GlobalDataContext } from "../../providers/global";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ReactElement } from "react";

export const LandingPage = (): ReactElement => {
  const navigate = useNavigate();
  const { setUser, setName, setUserDescription, name, userDescription } = useContext(GlobalDataContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const ERRORS = {
    INVALID_INPUTS: "Niepoprawny email lub hasło.",
    IN_PROMISE_ERROR: "Wystąpił błąd. Spróbuj ponownie.",
    AVATAR_ERROR: "Musisz dodać avatar przed rejestracją.",
    UPLOAD_ERROR: "Podczas dodawania pliku wystąpił błąd.",
    EMAIL_IN_USE: "Ten adres email został już użyty przy rejestracji.",
    TOO_MANY_TRIES: "Zbyt wiele prób logowania. Spróbuj później.",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    setError(null);
    if (showLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("home");
        setUser(email);
      })
      .catch(({ code }) => {
        if (code === "auth/wrong-password") {
          setError(ERRORS.INVALID_INPUTS);
        }
        if (code === "auth/too-many-requests") {
          setError(ERRORS.TOO_MANY_TRIES);
        }
      });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (url) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("home");
          setUser(email);
          addUser();
        })
        .catch(({ code }) => {
          if (code === "auth/email-already-in-use") {
            setError(ERRORS.EMAIL_IN_USE);
          } else {
            setError(ERRORS.IN_PROMISE_ERROR);
          }
        });
    } else {
      setError(ERRORS.AVATAR_ERROR);
    }
  };

  //send user to Firestore
  const addUser = async (): Promise<void> => {
    await addDoc(collection(db, "users"), {
      name: name,
      avatar: url,
      userDescription: userDescription,
      email: email,
      userJson: JSON.stringify({ user: email, participantName: name }),
    });
  };

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const uploadImage = () => {
    if (imageUpload) {
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
          setImageUpload(null);
        })
        .catch((error) => {
          setError(ERRORS.IN_PROMISE_ERROR);
        });
    } else {
      setError(ERRORS.UPLOAD_ERROR);
    }
  };

  return (
    <div className={styles.landingpage}>
      <div className={styles.infos}>
        <h1 className={styles.infos__logo}>
          <svg className={styles.infos__icon} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="45px" viewBox="0 0 24 24" width="45px" fill="#FFFFFF">
            <rect fill="none" height="45" width="45" />
            <path d="M11,14H9c0-4.97,4.03-9,9-9v2C14.13,7,11,10.13,11,14z M18,11V9c-2.76,0-5,2.24-5,5h2C15,12.34,16.34,11,18,11z M7,4 c0-1.11-0.89-2-2-2S3,2.89,3,4s0.89,2,2,2S7,5.11,7,4z M11.45,4.5h-2C9.21,5.92,7.99,7,6.5,7h-3C2.67,7,2,7.67,2,8.5V11h6V8.74 C9.86,8.15,11.25,6.51,11.45,4.5z M19,17c1.11,0,2-0.89,2-2s-0.89-2-2-2s-2,0.89-2,2S17.89,17,19,17z M20.5,18h-3 c-1.49,0-2.71-1.08-2.95-2.5h-2c0.2,2.01,1.59,3.65,3.45,4.24V22h6v-2.5C22,18.67,21.33,18,20.5,18z" />
          </svg>
          GoGather
        </h1>
        <h2 className={styles.infos__header}>Łatwiejsze spotkania w Gdańsku</h2>
        <p className={styles.infos__about}>
          Szukasz towarzysza do wspólnej aktywności? Dobrze trafiłeś! <br /> Niezależnie od tego czy chcesz iść poćwiczyć na siłownię czy szukasz przyjaciela do wspólnej nauki, <br /> GoGather ma dla Ciebie towarzysza.
        </p>
      </div>
      <div className={styles.formsection}>
        <h1 className={styles.formsection__header}>Proszę, {showLogin ? "zaloguj się" : "zarejestruj się"}</h1>
        <form className={styles.formsection__form} onSubmit={handleSubmit}>
          <input className={styles.formsection__input} type="email" placeholder="Wpisz email" name="email" onChange={(e) => setEmail(e.target.value)} required />
          <input className={styles.formsection__input} type="password" placeholder="Wpisz hasło" name="password" onChange={(e) => setPassword(e.target.value)} required />
          {!showLogin ? (
            <div className={styles.formsection__registerfields}>
              <input className={styles.formsection__input} placeholder="Wpisz imię" type="text" onChange={(e) => setName(e.target.value)} required />
              <textarea className={styles["formsection__input--textarea"]} placeholder="Opisz się w kilku słowach :)" onChange={(e) => setUserDescription(e.target.value)} required />
              {/* Profile image */}
              <div className={styles.formsection__addimagesection}>
                <input
                  className={styles.formsection__filepicker}
                  required
                  type="file"
                  name="avatar"
                  onChange={(event: ChangeEvent) => {
                    setImageUpload(() => {
                      const tgt = event.target as HTMLInputElement;
                      return (tgt.files as FileList)[0] as File;
                    });
                  }}
                />
                <img className={styles.formsection__avatar} alt="Avatar" src={url ? url : "https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png"} />
              </div>
              {imageUpload ? (
                <div className={styles["formsection__button--avatar"]} onClick={uploadImage}>
                  Dodaj zdjęcie profilowe
                </div>
              ) : null}
            </div>
          ) : null}
          <button className={styles.formsection__button}>{showLogin ? "Zaloguj" : "Zarejestruj"}</button>
          <p onClick={() => setShowLogin(!showLogin)} className={styles.formsection__toggleButton}>
            {showLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
          </p>
        </form>
        {error ? <p className={styles.formsection__errormessage}>{error}</p> : null}
      </div>
    </div>
  );
};
