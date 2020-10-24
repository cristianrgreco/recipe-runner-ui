import React, { useEffect, useState } from "react";
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
  imageFile,
  crop,
  cropScale,
  equipment,
  ingredients,
  method,
  requiresImageUpload,
}) {
  const [recipe, setRecipe] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (requiresImageUpload) {
      const imageObject = new Image();
      imageObject.onload = () => {
        setRecipe({
          name,
          image: getCroppedImage(imageObject, crop, cropScale),
          crop,
          description,
          duration: methodDuration(method),
          serves,
          equipment,
          ingredients,
          method,
        });
      };
      imageObject.src = image;
    }
  }, []);

  if (!recipe) {
    return <div />;
  }

  function getCroppedImage(image, crop, cropScale) {
    const canvas = document.createElement("canvas");
    const scaleX = cropScale.x;
    const scaleY = cropScale.y;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
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
        location = await updateRecipe(id, recipe, imageFile.type, requiresImageUpload);
      } else {
        location = await saveRecipe(recipe, imageFile.type, requiresImageUpload);
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
