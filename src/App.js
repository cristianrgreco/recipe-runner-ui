import React, {useEffect, useState} from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import CreateRecipe from "./CreateRecipe";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Login from "./Login";
import Register from "./Register";
import {isLoggedIn} from "./auth";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isLoggedIn().then(setLoggedIn);
    }, []);

    return (
        <Router>
            <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <main>
                <div className="container">
                    <Route exact path="/">
                        <Recipes/>
                    </Route>
                    <Route path="/login">
                        {loggedIn ? <Redirect to="/"/> : <Login setLoggedIn={setLoggedIn}/>}
                    </Route>
                    <Route path="/register">
                        {loggedIn ? <Redirect to="/"/> : <Register/>}
                    </Route>
                    <Route path="/create-recipe">
                        {loggedIn ? <CreateRecipe/> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/recipes/:recipeId">
                        <Recipe/>
                    </Route>
                </div>
            </main>
            <Footer/>
        </Router>
    );
}
