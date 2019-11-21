import React from "react";
import {Redirect, Route} from "react-router-dom";

export default function ConditionalRoute({condition, true: TrueComponent, false: FalseComponent, ...rest}) {
    return (
        <Route {...rest} render={props => {
            if (condition) {
                return <TrueComponent {...props}/>;
            } else {
                return <FalseComponent {...props}/>;
            }
        }}/>
    );
}
