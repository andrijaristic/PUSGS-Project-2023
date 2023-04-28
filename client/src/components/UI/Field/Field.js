import styles from "../Field/Field.module.css";

const Field = (props) => {
  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      <span>{props.value}</span>
    </div>
  );
};

export default Field;
