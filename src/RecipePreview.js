import React from 'react';
import styles from "./RecipePreview.module.css";
import {formatTime} from "./time";
import {Link} from "react-router-dom";
import {Icon} from "./components/Icon";
import {Button} from "./components/Button";
import {getLoggedInEmail} from "./auth";

export default function Recipe({recipe, loggedIn}) {
    const loggedInUserOwnsRecipe = () => {
        return loggedIn && getLoggedInEmail() === recipe.createdBy;
    };

    return (
        <div className={styles.Recipe}>
            <div className={styles.RecipeImage}>
                <img src={recipe.image} alt=""/>
            </div>
            <div className={styles.RecipeDetailsContainer}>
                <div className={styles.RecipeDetails}>
                    <div className={styles.RecipeDetailsNameContainer}>
                        <div className={styles.RecipeDetailsNameContainer_Name}>
                            {recipe.name}
                        </div>
                        {loggedInUserOwnsRecipe() && (
                            <div className={styles.RecipeDetailsNameContainer_Controls}>
                                <Link to={{pathname: `/recipe-editor`, state: {recipe}}}>
                                    <Button floating>
                                        <Icon name="edit"/>
                                    </Button>
                                </Link>
                            </div>
                        )}
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
                <Link to={{pathname: `/recipes/${recipe.id}`, state: {recipe}}}>
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
