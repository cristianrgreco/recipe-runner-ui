import React from "react";
import styles from './SubHeading.module.css';

export default function SubHeading({children}) {
    return (
        <div className={styles.SubHeading}>{children}</div>
    );
}
