import React, {Fragment, useEffect, useState} from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import CreateRecipe from "./CreateRecipe";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Login from "./Login";
import Register from "./Register";
import {isLoggedIn} from "./auth";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CreateRecipeNew from "./CreateRecipeNew";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(undefined);

    useEffect(() => {
        isLoggedIn().then(setLoggedIn);
    }, []);

    return (
        <Router>
            {loggedIn !== undefined && (
                <Fragment>
                    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                    <main>
                        <div className="container">
                            <Switch>
                                <Route exact path="/">
                                    <Recipes/>
                                </Route>
                                <Route path="/login">
                                    {loggedIn ? <Redirect to="/"/> : <Login setLoggedIn={setLoggedIn}/>}
                                </Route>
                                <Route path="/register">
                                    {loggedIn ? <Redirect to="/"/> : <Register setLoggedIn={setLoggedIn}/>}
                                </Route>
                                <Route path="/create-recipe">
                                    {loggedIn ? <CreateRecipe/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/create-recipe-new">
                                    {loggedIn ? <CreateRecipeNew/> : <Redirect to="/login"/>}
                                </Route>
                                <Route path="/recipes/:recipeId">
                                    <Recipe/>
                                </Route>
                            </Switch>
                        </div>
                    </main>
                    <Footer/>
                </Fragment>
            )}
        </Router>
    );
}
