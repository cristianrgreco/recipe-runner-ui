import React from 'react';
import theme from '../theme';

export function H1({children}) {
    return (
        <h1 className={`header ${theme.color}-text lighten-2`}>{children}</h1>
    );
}

export function H2({children}) {
    return (
        <h2 className={`header lighten-2`}>{children}</h2>
    );
}
