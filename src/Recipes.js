import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./Recipes.module.css";
import RecipePreview from "./RecipePreview";
import { fetchRecipes } from "./api";
import PLACEHOLDER_RECIPES from "./recipesPlaceholder";

export default function Recipes({ loggedIn }) {
  const [recipes, setRecipes] = useState(undefined);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRecipes(PLACEHOLDER_RECIPES);
      setSlow(true);
    }, 250);
    fetchRecipes().then((recipes) => {
      clearTimeout(timeout);
      setRecipes(recipes);
      setReady(true);
    });
  }, []);

  if (!recipes) {
    return <div />;
  }

  let className = "";
  if (!ready && slow) {
    className = styles.Placeholder;
  } else if (ready && slow) {
    className = styles.FadeIn;
  }

  const onDeleteRecipe = (recipe) => () => {
    setRecipes(recipes.filter((aRecipe) => aRecipe !== recipe));
  };

  return (
    <div className={`${className} ${styles.Recipes}`}>
      <Helmet>
        <title>La Cocina Leon</title>
        <meta name="description" content="Recetas de la familia Leon" />
      </Helmet>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.RecipePreview}>
          <RecipePreview recipe={recipe} loggedIn={loggedIn} onDelete={onDeleteRecipe(recipe)} />
        </div>
      ))}
    </div>
  );
}
