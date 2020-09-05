import React from 'react';
import styles from './Footer.module.css'

export default function () {
    return (
        <footer className={`page-footer ${styles.Footer}`}>
            <div className={`footer-copyright ${styles.Footer_Copyright}`}>
                <div className="container">
                    © 2019-2020 GRECO TECH LTD
                    <span className="right">VERSION {process.env.REACT_APP_VERSION}</span>
                </div>
            </div>
        </footer>
    );
}
