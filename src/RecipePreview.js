import React, { useState } from "react";
import styles from "./RecipePreview.module.css";
import { formatTime } from "./time";
import { Link } from "react-router-dom";
import { Icon } from "./components/Icon";
import { Button } from "./components/Button";
import { deleteRecipe } from "./api";
import Heading from "./components/Heading";

export default function RecipePreview({ recipe, loggedIn, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    setIsDeleting(true);
    await deleteRecipe(recipe.id);
    onDelete();
  };

  return (
    <div className={styles.Recipe}>
      <div className={styles.RecipeImage}>
        <img src={recipe.imageThumbnail} alt="" crossOrigin="anonymous" />
      </div>
      <div className={styles.RecipeDetailsContainer}>
        <div className={styles.RecipeDetails}>
          <div className={styles.RecipeDetailsNameContainer}>
            <div className={styles.RecipeDetailsNameContainer_Name}>
              <Heading>{recipe.name}</Heading>
            </div>
            {loggedIn && recipe.isEditable && (
              <div className={styles.RecipeDetailsNameContainer_Controls}>
                <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                  <Link to={{ pathname: `/recipe-editor`, state: { recipe } }}>
                    <Button floating>
                      <Icon name="edit" />
                    </Button>
                  </Link>
                </div>
                <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                  {isDeleting ? (
                    <Button floating danger loading />
                  ) : (
                    <Button floating danger confirm={<Icon name="check" />} onClick={onClickDelete}>
                      <Icon name="delete" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={styles.RecipeDetailsDescription}>{recipe.description}</div>
          <div className={styles.RecipeDetailsInfo}>
            <RecipeDetail value={recipe.serves} label="Serves" />
            <RecipeDetail value={formatTime(recipe.duration)} label="Duration" />
            <RecipeDetail value={recipe.ingredients.length} label="Ingredients" />
          </div>
        </div>
        <Link to={`/recipes/${recipe.id}`}>
          <div className={styles.RecipeDetailsLink}>
            <span>View Recipe</span>
            <span>
              <Icon name="keyboard_arrow_right" position="right" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function RecipeDetail({ value, label }) {
  return (
    <div className={styles.RecipeDetailsInfoItem}>
      <div className={styles.RecipeDetailsInfoItemValue}>{value}</div>
      <div className={styles.RecipeDetailsInfoItemLabel}>{label}</div>
    </div>
  );
}
