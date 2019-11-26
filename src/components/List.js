import React from "react";
import styles from './List.module.css';

export function List({children, className = '', ...props}) {
    return (
        <ul className={`${styles.Collection} collection ${className}`} {...props}>
            {children}
        </ul>
    );
}

export function ListItem({children, className = '', ...props}) {
    return (
        <li className={`${styles.Collection_Item} collection-item ${className}`} {...props}>
            {children}
        </li>
    );
}
