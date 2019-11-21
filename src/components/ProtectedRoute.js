import React from "react";
import {Redirect} from "react-router-dom";
import ConditionalRoute from "./ConditionalRoute";

export default function ProtectedRoute({component, loggedIn, ...rest}) {
    return (
        <ConditionalRoute
            {...rest}
            condition={loggedIn}
            true={component}
            false={props => <Redirect to="/login" {...props}/>}
        />
    );
}
