import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";

import { useDispatch } from "react-redux";

import styles from "../Login/LoginForm.module.css";
import { loginAction } from "../../store/userSlice";

const LoginForm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const usernameInput = useRef();
  const passwordInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const requestBody = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    dispatch(loginAction(requestBody));
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
        <button
          onClick={() => {
            nav("/register");
          }}
        >
          Register
        </button>
      </Card>
    </div>
  );
};

export default LoginForm;
