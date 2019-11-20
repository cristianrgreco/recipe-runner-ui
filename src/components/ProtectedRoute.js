import React from "react";
import {Redirect} from "react-router-dom";
import ConditionalRoute from "./ConditionalRoute";

export default function ProtectedRoute({component: Component, loggedIn, ...rest}) {
    return (
        <ConditionalRoute
            {...rest}
            condition={loggedIn}
            true={props => <Component {...props}/>}
            false={props => <Redirect to="/login" {...props}/>}
        />
    );
}
