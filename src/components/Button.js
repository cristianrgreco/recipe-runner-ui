import React from 'react';
import config from '../config';

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
        <div className={`waves-effect waves-light ${config.primary} ${config.primaryAlteration} ${btnClass()} ${position}`} {...props}>
            {children}
        </div>
    );
}
