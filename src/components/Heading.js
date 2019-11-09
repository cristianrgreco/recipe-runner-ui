import React from 'react';
import config from '../config';

export function H1({children, ...props}) {
    return (
        <h1 className={`header ${config.primary}-text text-${config.primaryAlteration}`} {...props}>
            {children}
        </h1>
    );
}

export function H2({children, ...props}) {
    return (
        <h2 className={`header text-${config.primaryAlteration}`} {...props}>
            {children}
        </h2>
    );
}
