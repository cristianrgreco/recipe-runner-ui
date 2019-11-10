import React, {useState, useEffect} from 'react';
import styles from './Recipes.module.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {formatTime} from "./time";
import config from './config';
import {Icon} from "./components/Icon";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes`);
        return response.data;
    };

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
                    <div className={`${styles.RecipeDetailsName} ${config.primary}-text text-${config.primaryAlteration}`}>
                        {recipe.name}
                    </div>
                    <div className={styles.RecipeDetailsDescription}>
                        {recipe.description}
                    </div>
                    <div className={styles.RecipeDetailsInfo}>
                        <RecipeDetailInfoItem value={recipe.serves} label="Serves"/>
                        <RecipeDetailInfoItem value={formatTime(recipe.duration)} label="Duration"/>
                        <RecipeDetailInfoItem value={recipe.ingredients.length} label="Ingredients"/>
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

function RecipeDetailInfoItem({value, label}) {
    return (
        <div className={styles.RecipeDetailsInfoItem}>
            <div className={`${styles.RecipeDetailsInfoItemValue} ${config.primary}-text text-${config.primaryAlteration}`}>
                {value}
            </div>
            <div className={`${styles.RecipeDetailsInfoItemLabel} ${config.secondary}-text text-${config.secondaryAlteration}`}>
                {label}
            </div>
        </div>
    );
}
