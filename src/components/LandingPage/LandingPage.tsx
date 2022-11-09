import styles from './LandingPage.module.css';
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


export const LandingPage : React.FC = () => {
const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<null | string>(null)

    const handleLogin = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // try {
        //     await signInWithEmailAndPassword(auth, email, password);
        //     navigate('/home')
        // } catch (error){
        //     // nie ma konta, robimy nowe
        //     try {
        //         createUserWithEmailAndPassword(auth, email, password);
        //         navigate('/home')
        //         console.log('banan')
        //     } catch (error) {
        //         console.log(error)
        //         setError(true)
        //     }
        // }
        signInWithEmailAndPassword(auth, email, password).then((r) => {
            navigate('home')
            console.log(r)
        }).catch( ({ message }) => {
            if (message === 'Firebase: Error (auth/wrong-password).')  {
                setError("Niepoprawny email lub hasło")
            }
            createUserWithEmailAndPassword(auth, email, password).then((r) => {
                navigate('home')
                console.log(r)
            }).catch(({ message }) => {
                console.log(message === 'Firebase: Error (auth/email-already-in-use).')
            })
        })
    }
    
 return (
    <div className={styles.wrapper}>
        <div className={styles.about}>
            <h2>O Nas</h2>
            <div>O Aplikacji tutaj</div>
        </div>
        <div className={styles.formWrapper}>
            <h2>Dołącz</h2>
            <div>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Wpisz email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Wpisz hasło" name='password' onChange={(e) => setPassword(e.target.value)} required/>
                    <button type='submit'>Zaloguj</button>
                    { error ? <p>{error}</p> : null}
                </form>
            </div>
        </div>
    </div>
 )

}