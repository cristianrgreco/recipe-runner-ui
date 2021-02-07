import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Recipe.module.css";
import { formatTime } from "./time";
import RecipeRunner from "./RecipeRunner";
import { Button } from "./components/Button";
import { fetchRecipe } from "./api";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import PLACEHOLDER_RECIPE from "./recipePlaceholder";
import ShareButton from "./components/ShareButton";
import EditRecipeButton from "./EditRecipeButton";
import DeleteRecipeButton from "./DeleteRecipeButton";
import RecipeEquipment from "./RecipeEquipment";
import RecipeIngredients from "./RecipeIngredients";
import RecipeMethod from "./RecipeMethod";

export default function Recipe({ loggedIn, recipe: recipeFromProps, meal, setMeal }) {
  const [recipe, setRecipe] = useState(undefined);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const { recipeId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (recipeFromProps) {
      setRecipe(recipeFromProps);
    } else {
      const timeout = setTimeout(() => {
        setRecipe(PLACEHOLDER_RECIPE);
        setSlow(true);
      }, 250);
      fetchRecipe(recipeId).then((recipe) => {
        clearTimeout(timeout);
        setRecipe(recipe);
        setReady(true);
      });
    }
  }, []);

  if (!recipe) {
    return <div />;
  }

  let className = "";
  if (!ready && slow) {
    className = styles.Placeholder;
  } else if (ready && slow) {
    className = styles.FadeIn;
  }

  const isRecipeInMeal = meal.some((mealItem) => mealItem.id === recipe.id);

  const addToMeal = () => {
    setMeal((meal) => [...meal, recipe]);
    history.push("/meal");
  };

  return (
    <div className={`${className} ${styles.Container}`}>
      <Helmet>
        <title>{recipe.name}</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:image" content={recipe.imageThumbnail} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={recipe.name} />
        <meta property="og:description" content={recipe.description} />
      </Helmet>
      <RecipeHeader loggedIn={loggedIn} recipe={recipe} />
      <RecipeDetails recipe={recipe} />
      <div className={styles.RecipeBody}>
        <div className={styles.RecipeBody_Requirements}>
          {recipe.equipment.length > 0 && <RecipeEquipment recipe={recipe} />}
          {recipe.ingredients.length > 0 && <RecipeIngredients recipe={recipe} />}
        </div>
        <div className={styles.RecipeBody_Method}>
          <div className={styles.Recipe_Heading}>
            <SubHeading>Method</SubHeading>
          </div>
          <div className={styles.RecipeBody_Method_Body}>
            {started ? (
              <RecipeRunner recipe={recipe} />
            ) : (
              <Fragment>
                <RecipeMethod recipe={recipe} />
                <div className={styles.RecipeBody_Method_Actions}>
                  <Button onClick={() => setStarted(true)}>Run</Button>
                  {!isRecipeInMeal && (
                    <Button secondary onClick={addToMeal}>
                      Add to meal
                    </Button>
                  )}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeHeader({ recipe, loggedIn }) {
  const history = useHistory();

  const onDelete = async () => {
    history.push("/");
  };

  return (
    <div className={styles.RecipeHeader}>
      <div className={styles.RecipeHeader_Image}>
        <img src={recipe.image} alt="" crossOrigin="anonymous" />
      </div>
      <div className={styles.RecipeHeader_Info}>
        <div className={styles.RecipeHeader_Info_NameContainer}>
          <div className={styles.RecipeHeader_Info_NameContainer_Name}>
            <Heading>{recipe.name}</Heading>
            <div className={styles.RecipeHeader_Info_NameContainer_Controls}>
              <ShareButton recipe={recipe} />
              {loggedIn && recipe.isEditable && (
                <Fragment>
                  <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                    <EditRecipeButton recipe={recipe} />
                  </div>
                  <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                    <DeleteRecipeButton recipe={recipe} onDelete={onDelete} />
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
        <div className={`${styles.Recipe_Heading}`}>
          <SubHeading>About this recipe</SubHeading>
        </div>
        <div className={styles.RecipeHeader_Info_Description}>{recipe.description}</div>
      </div>
    </div>
  );
}

function RecipeDetails({ recipe }) {
  return (
    <div className={styles.RecipeDetails}>
      <RecipeDetail value={recipe.serves} label="Serves" />
      <RecipeDetail value={formatTime(recipe.duration)} label="Duration" />
      <RecipeDetail value={recipe.ingredients.length} label="Ingredients" />
    </div>
  );
}

function RecipeDetail({ value, label }) {
  return (
    <div className={styles.RecipeDetails_InfoItem}>
      <div className={styles.RecipeDetails_InfoItem_Value}>{value}</div>
      <div className={styles.RecipeDetails_InfoItem_Label}>{label}</div>
    </div>
  );
}
