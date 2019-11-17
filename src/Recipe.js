import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './Recipe.module.css';
import {formatTime} from "./time";
import RecipeRunner from "./RecipeRunner";
import {Button} from "./components/Button";
import {fetchRecipe} from "./api";

export default function Recipe({recipe: recipee}) {
    const [recipe, setRecipe] = useState(recipee);
    const [started, setStarted] = useState(false);
    const {recipeId} = useParams();

    useEffect(() => {
        if (!recipe) {
            fetchRecipe(recipeId).then(recipe => setRecipe(recipe));
        }
    }, []);

    return (
        <Fragment>
            {recipe && (
                <div className={styles.Container}>
                    <RecipeHeader recipe={recipe}/>
                    <RecipeDetails recipe={recipe}/>
                    <div className={styles.RecipeBody}>
                        <div className={styles.RecipeBody_Requirements}>
                            {recipe.equipment.length > 0 && (
                                <RecipeEquipment recipe={recipe}/>
                            )}
                            {recipe.ingredients.length > 0 && (
                                <RecipeIngredients recipe={recipe}/>
                            )}
                        </div>
                        <div className={styles.RecipeBody_Method}>
                            <div className={styles.Recipe_Heading}>
                                Method
                            </div>
                            <div className={styles.RecipeBody_Method_Body}>
                                {started
                                    ? <RecipeRunner recipe={recipe}/>
                                    :
                                    (
                                        <Fragment>
                                            <RecipeMethod recipe={recipe}/>
                                            <Button onClick={() => setStarted(true)}>Run</Button>
                                        </Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

function RecipeHeader({recipe}) {
    return (
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
    );
}

function RecipeDetails({recipe}) {
    return (
        <div className={styles.RecipeDetails}>
            <RecipeDetail value={recipe.serves} label="Serves"/>
            <RecipeDetail value={formatTime(recipe.duration)} label="Duration"/>
            <RecipeDetail value={recipe.ingredients.length} label="Ingredients"/>
        </div>
    );
}

function RecipeDetail({value, label}) {
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

function RecipeEquipment({recipe}) {
    return (
        <div className={styles.RecipeBody_Requirements_Equipment}>
            <div className={styles.Recipe_Heading}>
                Equipment
            </div>
            <div className={styles.RecipeBody_Requirements_Equipment_Body}>
                <ul className={`${styles.Collection} collection`}>
                    {recipe.equipment.map(equipmentItem => (
                        <li key={equipmentItem} className={`${styles.Collection_Item} collection-item`}>
                            <label>
                                <input type="checkbox"/>
                                <span>{equipmentItem}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function RecipeIngredients({recipe}) {
    return (
        <div className={styles.RecipeBody_Requirements_Ingredients}>
            <div className={styles.Recipe_Heading}>
                Ingredients
            </div>
            <div className={styles.RecipeBody_Requirements_Ingredients_Body}>
                <ul className={`${styles.Collection} collection`}>
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient} className={`${styles.Collection_Item} collection-item`}>
                            <label>
                                <input type="checkbox"/>
                                <span>{ingredient}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function RecipeMethod({recipe}) {
    return (
        <ul className={`${styles.Collection} collection`}>
            <RecipeMethodItem methodItem={recipe.method}/>
        </ul>
    );
}

function RecipeMethodItem({methodItem}) {
    return (
        (methodItem || []).map(aMethodItem => (
            <Fragment key={aMethodItem.instruction}>
                <li className={`${styles.Collection_Item} collection-item`}>
                    {aMethodItem.instruction}
                </li>
                <RecipeMethodItem methodItem={aMethodItem.next}/>
            </Fragment>
        ))
    );
}
