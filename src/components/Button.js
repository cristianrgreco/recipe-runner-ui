import React from 'react';
import styles from './Button.module.css';

export function Button({children, secondary = false, large = false, floating = false, position = '', ...props}) {
    const btnType = () => {
        if (large) {
            return 'btn-large';
        } else if (floating) {
            return 'btn-floating';
        } else {
            return 'btn';
        }
    };

    const btnTheme = () => {
        if (secondary) {
            return `waves-effect waves-dark ${styles.Secondary}`;
        } else {
            return `waves-effect waves-light`;
        }
    };

    return (
        <button type="button" className={`${styles.Button} ${btnType()} ${btnTheme()} ${position}`} {...props}>
            {children}
        </button>
    );
}
