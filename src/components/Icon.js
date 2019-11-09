import React from 'react';

export function Icon({name, position = '', ...props}) {
    return (
        <i className={`material-icons ${position}`} {...props}>{name}</i>
    );
}
