import React, { Fragment, useState } from "react";
import styles from "./Meal.module.css";
import Heading from "./components/Heading";
import RecipeEquipment from "./RecipeEquipment";
import RecipeIngredients from "./RecipeIngredients";
import SubHeading from "./components/SubHeading";
import RecipeMethod from "./RecipeMethod";
import ToggleButton from "./components/ToggleButton";
import { Button } from "./components/Button";
import { Link } from "react-router-dom";
import AddToMealButton from "./AddToMealButton";

const VIEW_MODES = {
  SPLIT: "SPLIT",
  UNIFIED: "UNIFIED",
};

export default ({ meal }) => {
  const [viewMode, setViewMode] = useState("SPLIT");
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.Container}>
      <div className={styles.Heading_Spacing}>
        <Heading>Meal</Heading>
      </div>
      {meal.length === 0 ? <EmptyMeal /> : <Meal meal={meal} viewMode={viewMode} setViewMode={setViewMode} />}
    </div>
  );
};

function Meal({ meal, viewMode, setViewMode }) {
  const combinedRecipe = combineRecipe(meal);

  return (
    <Fragment>
      <div className={styles.ViewToggle}>
        <ToggleButton
          selected={viewMode}
          option1={VIEW_MODES.SPLIT}
          onOption1={() => setViewMode(VIEW_MODES.SPLIT)}
          option2={VIEW_MODES.UNIFIED}
          onOption2={() => setViewMode(VIEW_MODES.UNIFIED)}
        />
      </div>
      {viewMode === VIEW_MODES.SPLIT ? <SplitView meal={meal} /> : <MealItem mealItem={combinedRecipe} />}
    </Fragment>
  );
}

function EmptyMeal() {
  return (
    <Fragment>
      <p>Create a meal to plan and execute multiple recipes at once.</p>
      <p>
        Click the{" "}
        {
          <span className={styles.NoPointerEvents}>
            <AddToMealButton meal={[]} />
          </span>
        }{" "}
        button when you find a recipe you like.
      </p>
      <div className={styles.GetStarted}>
        <Link to="/">
          <Button>Get Started</Button>
        </Link>
      </div>
    </Fragment>
  );
}

function combineRecipe(meal) {
  return {
    equipment: meal.flatMap((mealItem) => mealItem.equipment),
    ingredients: meal.flatMap((mealItem) => mealItem.ingredients),
    method: meal.flatMap((mealItem) => mealItem.method),
  };
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
