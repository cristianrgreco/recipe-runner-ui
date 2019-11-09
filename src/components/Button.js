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
        <div style={{fontWeight: '600'}} className={`waves-effect waves-light white ${config.primary}-text text-${config.primaryAlteration} ${btnClass()} ${position}`} {...props}>
            {children}
        </div>
    );
}
