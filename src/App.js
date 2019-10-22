import React from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
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
                        <Home/>
                    </Route>
                    <Switch>
                        <Route path="/create-recipe">
                            <CreateRecipe/>
                        </Route>
                        <Route path="/recipes/:recipeId">
                            <Recipe/>
                        </Route>
                        <Route path="/recipes">
                            <Recipes/>
                        </Route>
                    </Switch>
                </div>
                <div className="section"/>
                <div className="section"/>
                <div className="section"/>
            </main>
            <Footer/>
        </Router>
    );
}
