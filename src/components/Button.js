import React from 'react';
import styles from './Button.module.css';

export function Button({children, large = false, floating = false, position = '', ...props}) {
    const btnClass = () => {
        if (large) {
            return 'btn-large';
        } else if (floating) {
            return 'btn-floating';
        } else {
            return 'btn';
        }
    };

    return (
        <button type="button" className={`${styles.Button} ${btnClass()} ${position}`} {...props}>
            {children}
        </button>
    );
}
