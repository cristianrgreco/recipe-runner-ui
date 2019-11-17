import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './Login.module.css';
import {login} from "./auth";
import {Button} from "./components/Button";

export default function Login({setLoggedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            await login(email, password);
            setLoggedIn(true);
            history.push('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Log in</div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="email" type="email" autoFocus={true} required value={email} onChange={onEmailChange}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="password" type="password" required minLength={8} value={password} onChange={onPasswordChange}/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <Button type="submit">Log in</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m12 l6">
                        {error && <div className={styles.ValidationError}>{error}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
}
