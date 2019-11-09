import React from 'react';
import theme from './theme';

export default function () {
    return (
        <footer className={`page-footer ${theme.color} lighten-2`}>
            <div className="footer-copyright">
                <div className="container">
                    © 2019 GRECO TECH LTD
                    <span className="right">Version {process.env.REACT_APP_VERSION}</span>
                </div>
            </div>
        </footer>
    );
}
