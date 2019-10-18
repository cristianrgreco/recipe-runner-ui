import React from 'react';
import Nav from "./Nav";
import Home from "./Home";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Nav/>
            <div className="container">
                <Route exact path="/">
                    <Home/>
                </Route>
                <Switch>
                    <Route path="/recipes/:recipeId">
                        <Recipe/>
                    </Route>
                    <Route path="/recipes">
                        <Recipes/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
