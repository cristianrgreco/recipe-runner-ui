import React, {useState, useEffect} from 'react';
import styles from './Recipes.module.css';
import {Link} from "react-router-dom";
import {formatTime} from "./time";
import {Icon} from "./components/Icon";
import {fetchRecipes} from "./api";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    return (
        <div className={styles.Recipes}>
            {recipes.map(recipe => (
                <Recipe key={recipe._id} recipe={recipe}/>
            ))}
        </div>
    );
}

function Recipe({recipe}) {
    return (
        <div className={styles.Recipe}>
            <div className={styles.RecipeImage}>
                <img src={recipe.image} alt=""/>
            </div>
            <div className={styles.RecipeDetailsContainer}>
                <div className={styles.RecipeDetails}>
                    <div className={styles.RecipeDetailsName}>
                        {recipe.name}
                    </div>
                    <div className={styles.RecipeDetailsDescription}>
                        {recipe.description}
                    </div>
                    <div className={styles.RecipeDetailsInfo}>
                        <RecipeDetail value={recipe.serves} label="Serves"/>
                        <RecipeDetail value={formatTime(recipe.duration)} label="Duration"/>
                        <RecipeDetail value={recipe.ingredients.length} label="Ingredients"/>
                    </div>
                </div>
                <Link to={`/recipes/${recipe._id}`}>
                    <div className={styles.RecipeDetailsLink}>
                        <span>
                            View Recipe
                        </span>
                        <span>
                            <Icon name="keyboard_arrow_right" position="right"/>
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

function RecipeDetail({value, label}) {
    return (
        <div className={styles.RecipeDetailsInfoItem}>
            <div className={styles.RecipeDetailsInfoItemValue}>
                {value}
            </div>
            <div className={styles.RecipeDetailsInfoItemLabel}>
                {label}
            </div>
        </div>
    );
}
