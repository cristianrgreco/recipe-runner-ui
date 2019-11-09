import React, {Fragment, useEffect, useState} from 'react';
import {Switch, Route, useParams} from "react-router-dom";
import axios from 'axios';
import RecipePreview from "./RecipePreview";
import RecipeRunner from "./RecipeRunner";
import {H1} from "./components/Heading";

export default function Recipe() {
    const [recipe, setRecipe] = useState(undefined);
    const {recipeId} = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes/${recipeId}`).then(response => setRecipe(response.data));
    }, []);

    return (
        <Fragment>
            {recipe && (
                <Fragment>
                    <H1>{recipe.name}</H1>
                    <Switch>
                        <Route path="/recipes/:recipeId/start">
                            <RecipeRunner recipe={recipe}/>
                        </Route>
                        <Route path="/recipes/:recipeId">
                            <RecipePreview recipe={recipe}/>
                        </Route>
                    </Switch>
                </Fragment>
            )}
        </Fragment>
    );
}
