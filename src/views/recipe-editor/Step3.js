import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./RecipeEditor.module.css";
import {Button} from "../../components/Button";
import {Icon} from "../../components/Icon";
import Input from "../../components/Input";
import Heading from "../../components/Heading";

export default function Step3({isEdit, ingredients, setIngredients}) {
    const [ingredient, setIngredient] = useState('');
    const history = useHistory();

    const onIngredientChange = e => {
        setIngredient(e.target.value);
    };

    const onEdit = ingredient => e => {
        const index = ingredients.findIndex(anIngredient => anIngredient === ingredient);
        const updatedIngredients = [...ingredients.slice(0, index), e.target.value, ...ingredients.slice(index + 1)];
        setIngredients(updatedIngredients);
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
                <div className={styles.Heading}>
                    <Heading>
                        {isEdit ? 'Edit Recipe' : 'Create Recipe'} (3/5)
                    </Heading>
                </div>
                {ingredients.length > 0 && (
                    <div className="row">
                        <div className="input-field col s12 m12 l6">
                            <ul className={`${styles.Collection} collection`}>
                                {ingredients.map((ingredient, i) => (
                                    <li key={i} className={`${styles.Collection_Item} collection-item`}>
                                        <div className={styles.Collection_Item_Content}>
                                            <Input type="text" required value={ingredient} onChange={onEdit(ingredient)}/>
                                        </div>
                                        <div className={styles.Collection_Item_Controls}>
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
                        <Input id="ingredient" type="text" autoFocus={true} required value={ingredient} onChange={onIngredientChange}/>
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
