import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import RecipeEditor from "./views/recipe-editor/RecipeEditor";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Login from "./Login";
import Register from "./Register";
import { isLoggedIn } from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ConditionalRoute from "./components/ConditionalRoute";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    (async () => {
      const loggedIn = await isLoggedIn();
      setLoggedIn(loggedIn);
    })();
  }, [loggedIn]);

  return (
    <Router>
      {loggedIn !== undefined && (
        <Fragment>
          <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <main>
            <div className="container">
              <Switch>
                <Route exact path="/" render={(props) => <Recipes loggedIn={loggedIn} {...props} />} />
                <ConditionalRoute
                  path="/login"
                  condition={loggedIn}
                  true={(props) => <Redirect to="/" {...props} />}
                  false={(props) => <Login setLoggedIn={setLoggedIn} {...props} />}
                />
                <ConditionalRoute
                  path="/register"
                  condition={loggedIn}
                  true={(props) => <Redirect to="/" {...props} />}
                  false={(props) => <Register setLoggedIn={setLoggedIn} {...props} />}
                />
                <ProtectedRoute
                  path="/recipe-editor"
                  loggedIn={loggedIn}
                  component={(props) => <RecipeEditor {...props} />}
                />
                <Route path="/recipes/:recipeId" render={(props) => <Recipe loggedIn={loggedIn} {...props} />} />
                <Redirect to="/" />
              </Switch>
            </div>
          </main>
          <Footer />
        </Fragment>
      )}
    </Router>
  );
}
