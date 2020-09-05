import React, {useState} from 'react';
import styles from './Button.module.css';
import Spinner from "./Spinner";

export function Button(
    {
        children,
        confirm,
        secondary,
        danger,
        large,
        floating,
        spinner,
        position = '',
        onClick = () => {},
        ...props
    }
) {
    const [isConfirm, setIsConfirm] = useState(false);

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
            return `${styles.Secondary}`;
        } else if (danger) {
            return `${styles.Danger}`;
        }
    };

    const modifiedOnClick = e => {
        if (confirm) {
            if (isConfirm) {
                return onClick(e);
            } else {
                setIsConfirm(true);
            }
        } else {
            return onClick(e);
        }
    };

    return (
        <button
            type="button"
            onClick={modifiedOnClick}
            className={`${styles.Button} ${floating && styles.Floating} ${btnType()} ${btnTheme()} ${spinner && styles.Spinner} ${position}`}
            {...props}
        >
            <div>
                {isConfirm ? confirm : children}
            </div>
            {spinner && (
                <div className={styles.SpinnerContainer}>
                    <Spinner/>
                </div>
            )}
        </button>
    );
}
