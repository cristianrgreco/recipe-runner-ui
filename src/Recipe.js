import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import styles from './Recipe.module.css';
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
                            <div className={styles.RecipeHeader_Info_Name}>
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
                                        <ul className={`${styles.Collection} collection`}>
                                            {recipe.equipment.map(equipmentItem => (
                                                <li key={equipmentItem} className={`${styles.Collection_Item} collection-item`}>
                                                    {equipmentItem}
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
                                        <ul className={`${styles.Collection} collection`}>
                                            {recipe.ingredients.map(ingredient => (
                                                <li key={ingredient} className={`${styles.Collection_Item} collection-item`}>
                                                    {ingredient}
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
            <div className={styles.RecipeDetails_InfoItem_Value}>
                {value}
            </div>
            <div className={styles.RecipeDetails_InfoItem_Label}>
                {label}
            </div>
        </div>
    );
}
