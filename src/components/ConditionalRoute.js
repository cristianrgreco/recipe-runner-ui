import React from "react";
import {Route} from "react-router-dom";

export default function ConditionalRoute({condition, true: trueComponent, false: falseComponent, ...rest}) {
    return (
        <Route {...rest} render={() => {
            if (condition) {
                return trueComponent();
            } else {
                return falseComponent();
            }
        }}/>
    );
}
