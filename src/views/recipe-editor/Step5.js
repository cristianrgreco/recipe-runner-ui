import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {methodDuration} from "../../duration";
import {saveRecipe, updateRecipe} from "../../api";
import baseStyles from "./RecipeEditor.module.css";
import styles from "./Step5.module.css";
import RecipePreview from "../../RecipePreview";
import Recipe from "../../Recipe";
import {Button} from "../../components/Button";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";

export default function Review({isEdit, id, name, description, serves, image, equipment, ingredients, method}) {
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

    const getImage = () => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        } else {
            return image;
        }
    };

    const recipeWithImagePreview = {
        ...recipe,
        image: getImage()
    };

    const onClickBack = () => {
        history.push('/recipe-editor/step-4');
    };

    const onClickPublish = async () => {
        setIsPublishing(true);

        let location;
        if (isEdit) {
            location = await updateRecipe(id, recipe, image);
        } else {
            location = await saveRecipe(recipe, image);
        }

        setIsPublishing(false);
        history.push(location);
    };

    return (
        <div className={baseStyles.Container}>
            <div className={baseStyles.Heading}>
                <Heading>
                    {isEdit ? 'Edit Recipe' : 'Create Recipe'} (5/5)
                </Heading>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <div className={baseStyles.SubHeading}>
                        <SubHeading>
                            Preview
                        </SubHeading>
                    </div>
                    <div className={styles.RecipePreview_Container}>
                        <RecipePreview recipe={recipeWithImagePreview}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <div className={baseStyles.SubHeading}>
                        <SubHeading>
                            Full
                        </SubHeading>
                    </div>
                    <Recipe recipe={recipeWithImagePreview}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <div className={baseStyles.ButtonsContainer}>
                        <Button secondary onClick={onClickBack}>Back</Button>
                        <Button onClick={onClickPublish} spinner={isPublishing}>
                            {isEdit ? 'Update' : 'Publish'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
