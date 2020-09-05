import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import styles from './Recipes.module.css';
import RecipePreview from "./RecipePreview";
import {fetchRecipes} from "./api";
import {Button} from "./components/Button";
import {Icon} from "./components/Icon";

export default function Recipes({loggedIn}) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    const onDeleteRecipe = recipe => () => {
        setRecipes(recipes.filter(aRecipe => aRecipe !== recipe));
    };

    return (
        <div className={styles.Recipes}>
            <Helmet>
                <title>La Cocina Leon</title>
                <meta name="description" content="Recetas de la familia Leon" />
            </Helmet>
            {recipes.map(recipe => (
                <RecipePreview
                    key={recipe.id}
                    recipe={recipe}
                    loggedIn={loggedIn}
                    onDelete={onDeleteRecipe(recipe)}
                />
            ))}
        </div>
    );
}
