import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./RecipeEditor.module.css";
import {Button} from "../../components/Button";
import {Icon} from "../../components/Icon";

export default function Step3({isEdit, ingredients, setIngredients}) {
    const [ingredient, setIngredient] = useState('');
    const history = useHistory();

    useEffect(() => {
        window.M.updateTextFields();
    });

    const onIngredientChange = e => {
        setIngredient(e.target.value);
    };

    const onDelete = ingredient => () => {
        setIngredients(ingredients.filter(anIngredient => anIngredient !== ingredient));
    };

    const onClickBack = () => {
        history.push('/recipe-editor/step-2');
    };

    const onClickNext = () => {
        history.push('/recipe-editor/step-4');
    };

    const onSubmit = async e => {
        e.preventDefault();
        setIngredients([...ingredients, ingredient]);
        setIngredient('');
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>{isEdit ? 'Edit Recipe' : 'Create Recipe'} (3/5)</div>
                {ingredients.length > 0 && (
                    <div className="row">
                        <div className="input-field col s12 m12 l6">
                            <ul className={`${styles.Collection} collection`}>
                                {ingredients.map(ingredient => (
                                    <li key={ingredient} className={`${styles.Collection_Item} collection-item`}>
                                        <div className={styles.Collection_Item_Content}>
                                            {ingredient}
                                        </div>
                                        <div>
                                            <Button danger floating onClick={onDelete(ingredient)}>
                                                <Icon name="delete"/>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="ingredient" type="text" autoFocus={true} required value={ingredient} onChange={onIngredientChange}/>
                        <label htmlFor="ingredient">Ingredients</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Button type="submit">Add</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <div className={styles.ButtonsContainer}>
                            <Button secondary onClick={onClickBack}>Back</Button>
                            <Button onClick={onClickNext}>Next</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
