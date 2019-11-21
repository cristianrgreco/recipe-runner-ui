import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import CreateRecipe from "./views/create-recipe/CreateRecipe";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Login from "./Login";
import Register from "./Register";
import {isLoggedIn} from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ConditionalRoute from "./components/ConditionalRoute";

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
                                <ConditionalRoute
                                    path="/login"
                                    condition={loggedIn}
                                    true={() => <Redirect to="/"/>}
                                    false={() => <Login setLoggedIn={setLoggedIn}/>}
                                />
                                <ConditionalRoute
                                    path="/register"
                                    condition={loggedIn}
                                    true={() => <Redirect to="/"/>}
                                    false={() => <Register setLoggedIn={setLoggedIn}/>}
                                />
                                <ProtectedRoute
                                    path="/create-recipe"
                                    loggedIn={loggedIn}
                                    component={() => <CreateRecipe/>}
                                />
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
