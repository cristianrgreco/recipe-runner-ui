import React from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import CreateRecipe from "./CreateRecipe";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Nav/>
            <main>
                <div className="container">
                    <Route exact path="/">
                        <Recipes/>
                    </Route>
                    <Switch>
                        <Route path="/create-recipe">
                            <CreateRecipe/>
                        </Route>
                        <Route path="/recipes/:recipeId">
                            <Recipe/>
                        </Route>
                    </Switch>
                </div>
            </main>
            <Footer/>
        </Router>
    );
}
