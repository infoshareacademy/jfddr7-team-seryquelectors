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

    const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('zalogowano')
            navigate('/home')
        } catch (error){
            console.log(error)
            try {
                createUserWithEmailAndPassword(auth, email, password);
                console.log('utworzono użytkownika')
                navigate('/home')
            } catch (error) {
                console.log('sory, nie wejdziesz')
            }
        }
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
                </form>
            </div>
        </div>
    </div>
 )

}