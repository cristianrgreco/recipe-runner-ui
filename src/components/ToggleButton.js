import React from "react";
import styles from "./ToggleButton.module.css";
import { Button } from "./Button";

export default function ToggleButton({ selected, option1, onOption1, option2, onOption2 }) {
  return (
    <div className={styles.ToggleButton}>
      {option1 === selected ? (
        <span className={styles.ToggleButton_Selected}>
          <Button onClick={onOption1}>{option1}</Button>
        </span>
      ) : (
        <Button onClick={onOption1}>{option1}</Button>
      )}
      {option2 === selected ? (
        <span className={styles.ToggleButton_Selected}>
          <Button onClick={onOption2}>{option2}</Button>
        </span>
      ) : (
        <Button onClick={onOption2}>{option2}</Button>
      )}
    </div>
  );
}
