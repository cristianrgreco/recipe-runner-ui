import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { methodDuration } from "../../duration";
import { saveRecipe, updateRecipe } from "../../api";
import baseStyles from "./RecipeEditor.module.css";
import styles from "./Step5.module.css";
import RecipePreview from "../../RecipePreview";
import Recipe from "../../Recipe";
import { Button } from "../../components/Button";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";

export default function Step5({
  isEdit,
  id,
  name,
  description,
  serves,
  image,
  imageType,
  equipment,
  ingredients,
  method,
  requiresImageUpload,
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const recipe = {
    name,
    image,
    description,
    duration: methodDuration(method),
    serves,
    equipment,
    ingredients,
    method,
  };

  const onClickBack = () => {
    history.push("/recipe-editor/step-4");
  };

  const onClickPublish = async () => {
    setError(null);
    setIsPublishing(true);

    let location;
    try {
      if (isEdit) {
        location = await updateRecipe(id, recipe, imageType, requiresImageUpload);
      } else {
        location = await saveRecipe(recipe, imageType, requiresImageUpload);
      }
    } catch (e) {
      setError("An error occurred, please try again later");
    }

    setIsPublishing(false);
    history.push(location);
  };

  return (
    <div className={baseStyles.Container}>
      <div className={baseStyles.Heading}>
        <Heading>{isEdit ? "Edit Recipe" : "Create Recipe"} (5/5)</Heading>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <div className={baseStyles.SubHeading}>
            <SubHeading>Preview</SubHeading>
          </div>
          <div className={styles.RecipePreview_Container}>
            <RecipePreview recipe={recipe} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <div className={baseStyles.SubHeading}>
            <SubHeading>Full</SubHeading>
          </div>
          <Recipe recipe={recipe} />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <div className={baseStyles.ButtonsContainer}>
            <Button secondary onClick={onClickBack}>
              Back
            </Button>
            <Button onClick={onClickPublish} spinner={isPublishing}>
              {isEdit ? "Update" : "Publish"}
            </Button>
            {error && <span className={styles.ValidationError}>{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
