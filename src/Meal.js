import React, { Fragment, useState } from "react";
import styles from "./Meal.module.css";
import Heading from "./components/Heading";
import RecipeEquipment from "./RecipeEquipment";
import RecipeIngredients from "./RecipeIngredients";
import SubHeading from "./components/SubHeading";
import RecipeMethod from "./RecipeMethod";
import Input from "./components/Input";

export default ({ meal }) => {
  const [isSplit, setIsSplit] = useState(true);
  const [started, setStarted] = useState(false);

  const combinedRecipe = combineRecipe(meal);

  return (
    <div className={styles.Container}>
      <div className={styles.Heading_Spacing}>
        <Heading>Meal</Heading>
      </div>
      <div className={styles.ViewToggle}>
        <ViewToggle isSplit={isSplit} setIsSplit={setIsSplit} />
      </div>
      {isSplit ? <SplitView meal={meal} /> : <MealItem mealItem={combinedRecipe} />}
    </div>
  );
};

function combineRecipe(meal) {
  return {
    equipment: meal.flatMap((mealItem) => mealItem.equipment),
    ingredients: meal.flatMap((mealItem) => mealItem.ingredients),
    method: meal.flatMap((mealItem) => mealItem.method),
  };
}

function ViewToggle({ isSplit, setIsSplit }) {
  return (
    <label>
      <Input type="checkbox" checked={isSplit} onClick={() => setIsSplit(!isSplit)} />
      <span>Split view</span>
    </label>
  );
}

function SplitView({ meal }) {
  return meal.map((mealItem) => (
    <div className={styles.MealItem_Spacing}>
      <MealItem mealItem={mealItem} />
    </div>
  ));
}

function MealItem({ mealItem }) {
  return (
    <div key={mealItem.id}>
      <div className={styles.MealItem_SubHeading_Spacing}>
        <SubHeading>{mealItem.name}</SubHeading>
      </div>

      <div className={styles.RecipeBody}>
        <div className={styles.RecipeBody_Requirements}>
          {mealItem.equipment.length > 0 && <RecipeEquipment recipe={mealItem} />}
          {mealItem.ingredients.length > 0 && <RecipeIngredients recipe={mealItem} />}
        </div>
        <div className={styles.RecipeBody_Method}>
          <div className={styles.Recipe_Heading}>
            <SubHeading>Method</SubHeading>
          </div>
          <div className={styles.RecipeBody_Method_Body}>
            <Fragment>
              <RecipeMethod recipe={mealItem} />
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}
