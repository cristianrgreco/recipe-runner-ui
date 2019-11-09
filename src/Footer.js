import React from 'react';
import config from './config';

export default function () {
    return (
        <footer className={`page-footer ${config.primary} ${config.primaryAlteration}`}>
            <div className="footer-copyright">
                <div className="container">
                    © 2019 GRECO TECH LTD
                    <span className="right">Version {process.env.REACT_APP_VERSION}</span>
                </div>
            </div>
        </footer>
    );
}
