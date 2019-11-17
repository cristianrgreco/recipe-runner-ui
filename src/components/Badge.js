import React from 'react';
import styles from "./Badge.module.css";

export default function Badge({green, orange, children}) {
    return (
        <span className={`badge ${styles.Badge} ${green ? styles.Green : ''} ${orange ? styles.Orange : ''}`}>
            {children}
        </span>
    );
}
