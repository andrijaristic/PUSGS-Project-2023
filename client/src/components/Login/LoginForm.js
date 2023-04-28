import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";

import styles from "../Login/LoginForm.module.css";

const LoginForm = () => {
  const ctx = useContext(AuthContext);
  const nav = useNavigate();
  const usernameInput = useRef();
  const passwordInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const requestBody = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    ctx.onLogin(requestBody);
  };

  return (
    <div className={styles.container}>
      <Card>
        <form>
          <Input id="username" label="Username" ref={usernameInput} />
          <Input
            id="password"
            label="Password"
            type="password"
            ref={passwordInput}
          />
          <button onClick={submitHandler}>Sign in</button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
