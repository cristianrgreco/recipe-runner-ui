import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from './Login.module.css';
import {login} from "./auth";

export default function Login({setLoggedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();

        try {
            await login(email, password);
            setLoggedIn(true);
            history.push('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h1>Log in to Hello Diners</h1>
            </div>
            <div className="input-field">
                <input id="email" type="email" autoFocus={true} value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <label htmlFor="password">Password</label>
            </div>
            <button type="submit">Log in</button>
            {error && (
                <div>{error}</div>
            )}
        </form>
    );
}
