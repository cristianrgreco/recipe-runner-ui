import React, { useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import styles from "./Login.module.css";
import { confirmResetPassword, login, resetPassword } from "./auth";
import { Button } from "./components/Button";
import Input from "./components/Input";
import Heading from "./components/Heading";

export default function ForgotPassword({ setLoggedIn }) {
  const [user, setUser] = useState(undefined);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  return (
    <Switch>
      <Route exact path="/account/forgot-password">
        <EnterEmailForm setUser={setUser} setConfirmedEmail={setConfirmedEmail} />
      </Route>
      <Route
        exact
        path="/account/forgot-password/reset"
        render={() => {
          if (user) {
            return <ConfirmResetForm email={confirmedEmail} setLoggedIn={setLoggedIn} />;
          } else {
            return <Redirect to="/account/forgot-password" />;
          }
        }}
      />
    </Switch>
  );
}

function EnterEmailForm({ setUser, setConfirmedEmail }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      const user = await resetPassword(email);
      setUser(user);
      setConfirmedEmail(email);
      history.push("/account/forgot-password/reset");
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("Unable to reset password.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={onSubmit}>
        <div className={styles.Heading}>
          <Heading>Password Reset</Heading>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input id="email" type="email" required autoFocus={true} value={email} onChange={onEmailChange} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Button type="submit" spinner={isLoading}>
              Reset
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">{error && <div className={styles.ValidationError}>{error}</div>}</div>
        </div>
      </form>
    </div>
  );
}

function ConfirmResetForm({ email, setLoggedIn }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const getValidationError = () => {
    if (password !== confirmPassword) {
      return "Passwords must match";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationError = getValidationError();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await confirmResetPassword(email, password, confirmationCode);
      await login(email, password);
      setLoggedIn(true);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError("Invalid confirmation code.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={onSubmit}>
        <div className={styles.Heading}>
          <Heading>Password Reset</Heading>
        </div>
        <div className="row">
          <div className="col s12 m12 l3">
            <span>A confirmation code has been sent to your email.</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={onPasswordChange}
              autoFocus={true}
            />
            <label htmlFor="password">New Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input
              id="confirm-password"
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
            <label htmlFor="confirm-password">Confirm New Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input id="confirmation-code" type="text" value={confirmationCode} onChange={onConfirmationCodeChange} />
            <label htmlFor="confirmation-code">Confirmation Code</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Button type="submit" spinner={isLoading}>
              Submit
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">{error && <div className={styles.ValidationError}>{error}</div>}</div>
        </div>
      </form>
    </div>
  );
}
