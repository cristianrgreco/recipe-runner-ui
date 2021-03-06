import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "./auth";
import { Button } from "./components/Button";
import Input from "./components/Input";
import Heading from "./components/Heading";
import { StyledLink } from "./StyledLink";

export default function Login({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
      setLoggedIn(true);
      history.push("/");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={onSubmit}>
        <div className={styles.Heading}>
          <Heading>Log in</Heading>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input required id="email" type="email" autoFocus={true} value={email} onChange={onEmailChange} />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <Input id="password" type="password" required minLength={8} value={password} onChange={onPasswordChange} />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l3">
            <div className={styles.LoginButtonContainer}>
              <Button type="submit" spinner={isLoading}>
                Log in
              </Button>
            </div>
            <StyledLink to={{ pathname: "/account/forgot-password" }}>Forgot your password</StyledLink>
          </div>
        </div>
        <div className="row">
          <div className="col s12">{error && <div className={styles.ValidationError}>{error}</div>}</div>
        </div>
      </form>
    </div>
  );
}
