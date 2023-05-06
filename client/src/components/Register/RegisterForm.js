import React, { useRef } from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import { useDispatch } from "react-redux";
import { registerAction } from "../../store/userSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const emailInput = useRef();
  const nameInput = useRef();
  const dateOfBirthInput = useRef();
  const addressInput = useRef();
  const roleInput = useRef();
  const imageInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", usernameInput.current.value);
    formData.append("password", passwordInput.current.value);
    formData.append("email", emailInput.current.value);
    formData.append("name", nameInput.current.value);
    formData.append("dateOfBirth", dateOfBirthInput.current.value);
    formData.append("address", addressInput.current.value);
    formData.append("role", roleInput.current.value);
    formData.append("image", imageInput.current.files[0]);

    dispatch(registerAction(formData));
  };

  return (
    <Card>
      <form>
        <Input id="username" label="Username" ref={usernameInput}></Input>
        <Input id="password" label="Password" ref={passwordInput}></Input>
        <Input
          id="confirmPassword"
          label="Confirm password"
          ref={confirmPasswordInput}
        ></Input>
        <Input id="email" label="E-mail" ref={emailInput}></Input>
        <Input id="name" label="Name" ref={nameInput}></Input>
        <Input
          id="dateOfBirth"
          label="Date of birth"
          ref={dateOfBirthInput}
          type="date"
        ></Input>
        <Input id="address" label="Address" ref={addressInput}></Input>
        <Input id="role" label="Role" ref={roleInput}></Input>
        <input id="image" type="file" ref={imageInput}></input> <br />
        <button onClick={submitHandler}>Register</button>
      </form>
    </Card>
  );
};

export default RegisterForm;
