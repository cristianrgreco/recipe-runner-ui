import React, {useEffect, useState} from 'react';
import styles from './Recipes.module.css';
import RecipePreview from "./RecipePreview";
import {fetchRecipes} from "./api";

export default function Recipes({loggedIn, loggedInEmail}) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    const onDeleteRecipe = recipe => () => {
        setRecipes(recipes.filter(aRecipe => aRecipe !== recipe));
    };

    return (
        <div className={styles.Recipes}>
            {recipes.map(recipe => (
                <RecipePreview
                    key={recipe.id}
                    loggedIn={loggedIn}
                    loggedInEmail={loggedInEmail}
                    recipe={recipe}
                    onDelete={onDeleteRecipe(recipe)}
                />
            ))}
        </div>
    );
}
