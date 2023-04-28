import { forwardRef } from "react";
import styles from "../Input/Input.module.css";

const Input = forwardRef((props, ref) => {
  return (
    <div className={styles.container}>
      <label htmlFor={props.id}>{props.label}: </label>
      <input
        id={props.id}
        type={props.type ? props.type : "text"}
        ref={ref}
        autoComplete="off"
      ></input>
    </div>
  );
});

export default Input;
