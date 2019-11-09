import React from 'react';
import config from '../config';

export function H1({children, ...props}) {
    return (
        <h1 className={`header ${config.color}-text lighten-2`} {...props}>
            {children}
        </h1>
    );
}

export function H2({children, ...props}) {
    return (
        <h2 className={`header lighten-2`} {...props}>
            {children}
        </h2>
    );
}
