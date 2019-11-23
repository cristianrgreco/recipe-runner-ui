import React from "react";
import {Route, Router} from "react-router-dom";
import {createMemoryHistory} from "history";

export const routerDecorator = story => (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path="/" component={() => story()} />
    </Router>
);
