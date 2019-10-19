import React, {Fragment} from 'react';
import {Switch, Route, useParams} from "react-router-dom";
import {RECIPES} from "./data";
import RecipePreview from "./RecipePreview";
import RecipeRunner from "./RecipeRunner";

export default function Recipe() {
    const {recipeId} = useParams();

    const recipe = RECIPES.find(aRecipe => aRecipe.id === recipeId);

    return (
        <Fragment>
            <h1 className="header">{recipe.name}</h1>
            <Switch>
                <Route path="/recipes/:recipeId/start">
                    <RecipeRunner recipe={recipe}/>
                </Route>
                <Route path="/recipes/:recipeId">
                    <RecipePreview recipe={recipe}/>
                </Route>
            </Switch>
        </Fragment>
    );
}
