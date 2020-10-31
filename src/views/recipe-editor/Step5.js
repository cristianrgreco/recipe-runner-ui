import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { saveRecipe, updateRecipe } from "../../api";
import baseStyles from "./RecipeEditor.module.css";
import styles from "./Step5.module.css";
import RecipePreview from "../../RecipePreview";
import Recipe from "../../Recipe";
import { Button } from "../../components/Button";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import { getCroppedImageBlob, getCroppedImageThumbnailBlob } from "./cropImage";
import { methodDuration } from "../../duration";

export default function Step5({
  isEdit,
  id,
  name,
  description,
  serves,
  image,
  crop,
  cropScale,
  equipment,
  ingredients,
  method,
}) {
  const [recipe, setRecipe] = useState(null);
  const [recipeWithImage, setRecipeWithImage] = useState(null);
  const [ready, setReady] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const recipe = {
        name,
        crop,
        description,
        duration: methodDuration(method),
        serves,
        equipment,
        ingredients,
        method,
      };
      const croppedImage = await getCroppedImageBlob(image, crop, cropScale);
      const croppedImageThumbnail = await getCroppedImageThumbnailBlob(image, crop, cropScale);
      setRecipe({ ...recipe, image: croppedImage, imageThumbnail: croppedImageThumbnail });
      setRecipeWithImage({
        ...recipe,
        image: URL.createObjectURL(croppedImage),
        imageThumbnail: URL.createObjectURL(croppedImageThumbnail),
      });
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return <div />;
  }

  const onClickBack = () => {
    history.push("/recipe-editor/step-4");
  };

  const onClickPublish = async () => {
    setError(null);
    setIsPublishing(true);

    let location;
    try {
      if (isEdit) {
        location = await updateRecipe(id, recipe);
      } else {
        location = await saveRecipe(recipe);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred, please try again later.");
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
            <RecipePreview recipe={recipeWithImage} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <div className={baseStyles.SubHeading}>
            <SubHeading>Full</SubHeading>
          </div>
          <Recipe recipe={recipeWithImage} />
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
