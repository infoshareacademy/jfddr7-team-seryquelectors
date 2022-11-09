import styles from './LandingPage.module.css';

export const LandingPage = () => {

    // const [login, setLogin] = useState('')
    // const [password, setPassword] = useState('')

    // const onLogin = () => {
    //     const user = { login, password };

    // }
    
 return (
    <div className={styles.wrapper}>
        <div className={styles.about}>
            <h2>O Nas</h2>
            <div>O Aplikacji tutaj</div>
        </div>
        <div className={styles.formWrapper}>
            <h2>Dołącz</h2>
            <div>
                <form>
                    <input type="email" placeholder="Wpisz email" name='email' required/>
                    <input type="password" placeholder="Wpisz hasło" name='password' required/>
                    <button type='submit'>Zaloguj</button>
                </form>
            </div>
        </div>
    </div>
 )

}