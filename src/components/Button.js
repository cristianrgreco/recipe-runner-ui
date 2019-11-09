import React from 'react';
import theme from '../theme';

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
        <div className={`waves-effect waves-light ${theme.color} lighten-2 ${btnClass()} ${position}`} {...props}>
            {children}
        </div>
    );
}
