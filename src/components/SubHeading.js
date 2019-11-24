import React from "react";
import styles from './SubHeading.module.css';

export default function SubHeading({children}) {
    return (
        <h2 className={styles.SubHeading}>{children}</h2>
    );
}
