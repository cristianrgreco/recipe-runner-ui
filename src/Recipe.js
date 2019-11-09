import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import styles from './Recipe.module.css';
import config from "./config";
import {formatTime} from "./time";
import RecipeRunner from "./RecipeRunner";

export default function Recipe() {
    const [recipe, setRecipe] = useState(undefined);
    const {recipeId} = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes/${recipeId}`).then(response => setRecipe(response.data));
    }, []);

    return (
        <Fragment>
            {recipe && (
                <div className={styles.Container}>
                    <div className={styles.RecipeHeader}>
                        <div className={styles.RecipeHeader_Image}>
                            <img src={recipe.image} alt=""/>
                        </div>
                        <div className={styles.RecipeHeader_Info}>
                            <div className={`${styles.RecipeHeader_Info_Name} ${config.primary}-text text-${config.primaryAlteration}`}>
                                {recipe.name}
                            </div>
                            <div className={`${styles.Recipe_Heading}`}>
                                About this recipe
                            </div>
                            <div className={styles.RecipeHeader_Info_Description}>
                                {recipe.description}
                            </div>
                        </div>
                    </div>
                    <div className={styles.RecipeDetails}>
                        <RecipeDetailInfoItem value={recipe.serves} label="Serves"/>
                        <RecipeDetailInfoItem value={formatTime(recipe.duration)} label="Duration"/>
                        <RecipeDetailInfoItem value={recipe.ingredients.length} label="Ingredients"/>
                    </div>
                    <div className={styles.RecipeBody}>
                        <div className={styles.RecipeBody_Requirements}>
                            {recipe.equipment.length > 0 && (
                                <div className={styles.RecipeBody_Requirements_Equipment}>
                                    <div className={styles.Recipe_Heading}>
                                        Equipment
                                    </div>
                                    <div className={styles.RecipeBody_Requirements_Equipment_Body}>
                                        <ul className="collection">
                                            {recipe.equipment.map(equipmentItem => (
                                                <li className="collection-item">
                                                    <label>
                                                        <input type="checkbox"/>
                                                        <span>{equipmentItem}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {recipe.ingredients.length > 0 && (
                                <div className={styles.RecipeBody_Requirements_Ingredients}>
                                    <div className={styles.Recipe_Heading}>
                                        Ingredients
                                    </div>
                                    <div className={styles.RecipeBody_Requirements_Ingredients_Body}>
                                        <ul className="collection">
                                            {recipe.ingredients.map(ingredient => (
                                                <li className="collection-item">
                                                    <label>
                                                        <input type="checkbox"/>
                                                        <span>{ingredient}</span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.RecipeBody_Method}>
                            <div className={styles.Recipe_Heading}>
                                Method
                            </div>
                            <div className={styles.RecipeBody_Method_Body}>
                                <RecipeRunner recipe={recipe}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

function RecipeDetailInfoItem({value, label}) {
    return (
        <div className={styles.RecipeDetails_InfoItem}>
            <div className={`${styles.RecipeDetails_InfoItem_Value} ${config.primary}-text ${config.primaryAlteration}`}>
                {value}
            </div>
            <div className={`${styles.RecipeDetails_InfoItem_Label} ${config.secondary}-text ${config.secondaryAlteration}`}>
                {label}
            </div>
        </div>
    );
}
