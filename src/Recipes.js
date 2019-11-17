import React, {useEffect, useState} from 'react';
import styles from './Recipes.module.css';
import RecipePreview from "./RecipePreview";
import {fetchRecipes} from "./api";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    return (
        <div className={styles.Recipes}>
            {recipes.map(recipe => (
                <RecipePreview key={recipe._id} recipe={recipe}/>
            ))}
        </div>
    );
}
