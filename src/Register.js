import React, {useState} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import styles from './Login.module.css';
import {confirmRegistration, login, register} from "./auth";
import {Button} from "./components/Button";

export default function Register({setLoggedIn}) {
    const [user, setUser] = useState(undefined);
    const [confirmedEmail, setConfirmedEmail] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <Switch>
            <Route exact path="/register">
                <RegistrationForm setUser={setUser} setConfirmedEmail={setConfirmedEmail} setConfirmedPassword={setConfirmedPassword}/>
            </Route>
            <Route exact path="/register/confirm" render={() => {
                if (user) {
                    return <ConfirmRegistrationForm user={user} email={confirmedEmail} password={confirmedPassword} setLoggedIn={setLoggedIn}/>
                } else {
                    return <Redirect to="/register"/>
                }
            }}>
            </Route>
        </Switch>
    );
}

function RegistrationForm({setUser, setConfirmedEmail, setConfirmedPassword}) {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const getValidationError = () => {
        if (email !== confirmEmail) {
            return 'Emails must match';
        } else if (password !== confirmPassword) {
            return 'Passwords must match';
        }
    };

    const onSubmit = async e => {
        e.preventDefault();

        const validationError = getValidationError();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setError('');
            const user = await register(email, password);
            setUser(user);
            setConfirmedEmail(email);
            setConfirmedPassword(password);
            history.push('/register/confirm');
        } catch (err) {
            switch (err.code) {
                case 'UsernameExistsException':
                    setError('User already exists');
                    break;
                case 'InvalidPasswordException':
                case 'InvalidParameterException':
                    setError('Password must be at least 8 characters and contain numbers, special characters, and both upper and lower case letters');
                    break;
                default:
                    setError(`An unknown registration error occurred: ${err.code}`);
            }
        }
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onConfirmEmailChange = e => {
        setConfirmEmail(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Register</div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="email" type="email" required autoFocus={true} value={email} onChange={onEmailChange}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="confirm-email" type="email" required value={confirmEmail} onChange={onConfirmEmailChange}/>
                        <label htmlFor="confirm-email">Confirm Email</label>
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
                        <input id="confirm-password" type="password" required minLength={8} value={confirmPassword} onChange={onConfirmPasswordChange}/>
                        <label htmlFor="confirm-password">Confirm Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <Button type="submit">Register</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        {error && <div className={styles.ValidationError}>{error}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
}

function ConfirmRegistrationForm({user, email, password, setLoggedIn}) {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const onSubmit = async e => {
        e.preventDefault();

        try {
            setError('');
            await confirmRegistration(user, confirmationCode);
            await login(email, password);
            setLoggedIn(true);
            history.push('/');
        } catch (err) {
            setError('Invalid confirmation code');
        }
    };

    const onConfirmationCodeChange = e => {
        setConfirmationCode(e.target.value);
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Register</div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="confirmation-code" type="text" autoFocus={true} value={confirmationCode}
                               onChange={onConfirmationCodeChange}/>
                        <label htmlFor="confirmation-code">Confirmation Code</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6">
                        {error && <div className={styles.ValidationError}>{error}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
}
