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
                                <Route exact path="/" component={Recipes}/>
                                <Route path="/login" render={() => loggedIn ? <Redirect to="/"/> : <Login setLoggedIn={setLoggedIn}/>}/>
                                <Route path="/register" render={() => loggedIn ? <Redirect to="/"/> : <Register setLoggedIn={setLoggedIn}/>}/>
                                <Route path="/create-recipe" render={() => loggedIn ? <CreateRecipe/> : <Redirect to="/login"/>}/>
                                <Route path="/recipes/:recipeId" component={Recipe}/>
                            </Switch>
                        </div>
                    </main>
                    <Footer/>
                </Fragment>
            )}
        </Router>
    );
}
