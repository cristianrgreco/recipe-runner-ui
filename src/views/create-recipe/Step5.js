import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {methodDuration} from "../../duration";
import {saveRecipe} from "../../api";
import baseStyles from "./CreateRecipe.module.css";
import styles from "./Step5.module.css";
import RecipePreview from "../../RecipePreview";
import Recipe from "../../Recipe";
import {Button} from "../../components/Button";

export default function Review({name, description, serves, image, equipment, ingredients, method}) {
    const [isPublishing, setIsPublishing] = useState(false);
    const history = useHistory();

    const recipe = {
        name,
        description,
        duration: methodDuration(method),
        serves,
        equipment,
        ingredients,
        method
    };

    const recipeWithImagePreview = {
        ...recipe,
        image: URL.createObjectURL(image)
    };

    const onClickBack = () => {
        history.push('/create-recipe/step-4');
    };

    const onClickPublish = async () => {
        setIsPublishing(true);
        const location = await saveRecipe(recipe, image);
        setIsPublishing(false);
        history.push(location);
    };

    return (
        <div className={baseStyles.Container}>
            <div className={baseStyles.Heading}>Create Recipe (5/5)</div>
            <div className="row">
                <div className={baseStyles.SubHeading}>Snippet</div>
                <div className={styles.RecipePreview_Container}>
                    <RecipePreview recipe={recipeWithImagePreview}/>
                </div>
            </div>
            <div className="row">
                <div className={baseStyles.SubHeading}>Full</div>
                <Recipe recipe={recipeWithImagePreview}/>
            </div>
            <div className="row">
                <div className="input-field col s12 m12 l6">
                    <div className={baseStyles.ButtonsContainer}>
                        <Button secondary onClick={onClickBack}>Back</Button>
                        <Button onClick={onClickPublish} spinner={isPublishing}>Publish</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
