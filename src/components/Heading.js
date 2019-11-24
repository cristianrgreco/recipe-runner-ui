import React from "react";
import styles from './Heading.module.css';

export default function Heading({children}) {
    return (
        <div className={styles.Heading}>{children}</div>
    );
}
