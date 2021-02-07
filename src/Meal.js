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
import { Icon } from "./components/Icon";
import RecipeRunner from "./RecipeRunner";

const VIEW_MODES = {
  SPLIT: "SPLIT",
  UNIFIED: "UNIFIED",
};

export default ({ meal, setMeal }) => {
  const [viewMode, setViewMode] = useState("SPLIT");
  const [started, setStarted] = useState(false);

  const combinedRecipe = combineRecipe(meal);

  let view;
  if (meal.length === 0) {
    view = <EmptyMeal />;
  } else if (started) {
    view = <RecipeRunner recipe={combinedRecipe} />;
  } else {
    view = (
      <Meal
        meal={meal}
        setMeal={setMeal}
        combinedRecipe={combinedRecipe}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setStarted={setStarted}
      />
    );
  }

  return <div className={styles.Container}>{view}</div>;
};

function Meal({ meal, setMeal, combinedRecipe, viewMode, setViewMode, setStarted }) {
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

      {viewMode === VIEW_MODES.SPLIT ? (
        <SplitView meal={meal} setMeal={setMeal} />
      ) : (
        <UnifiedView combinedRecipe={combinedRecipe} setMeal={setMeal} />
      )}

      <div className={styles.ActionButtons}>
        <Button onClick={() => setStarted(true)}>Run</Button>
        <Link to="/">
          <Button secondary>Add more</Button>
        </Link>
      </div>
    </Fragment>
  );
}

function EmptyMeal() {
  return (
    <Fragment>
      <div className={styles.Heading_Spacing}>
        <Heading>Meal</Heading>
      </div>
      <p>
        Create a meal to plan and execute multiple recipes at once. Simply click the {<AddToMealButtonExample />} button
        when you find a recipe you like.
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
    name: meal.map((mealItem) => mealItem.name).join(", "),
    equipment: meal.flatMap((mealItem) => mealItem.equipment),
    ingredients: meal.flatMap((mealItem) => mealItem.ingredients),
    method: meal.flatMap((mealItem) => mealItem.method),
  };
}

function AddToMealButtonExample() {
  return (
    <span className={styles.NoPointerEvents}>
      <AddToMealButton meal={[]} />
    </span>
  );
}

function SplitView({ meal, setMeal }) {
  const onDelete = (mealItem) => setMeal((mealItems) => mealItems.filter((aMealItem) => aMealItem.id !== mealItem.id));

  return meal.map((mealItem) => (
    <div className={styles.MealItem_Spacing}>
      <MealItem mealItem={mealItem} onDelete={() => onDelete(mealItem)} />
    </div>
  ));
}

function UnifiedView({ combinedRecipe, setMeal }) {
  const onDelete = () => setMeal([]);

  return (
    <div className={styles.MealItem_Spacing}>
      <MealItem mealItem={combinedRecipe} onDelete={onDelete} />
    </div>
  );
}

function MealItem({ mealItem, onDelete }) {
  return (
    <div key={mealItem.id}>
      <div className={styles.MealItem_SubHeading}>
        <Heading>{mealItem.name}</Heading>
        <DeleteMealItemButton onDelete={onDelete} />
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

function DeleteMealItemButton({ onDelete }) {
  return (
    <Button floating danger confirm={<Icon name="check" />} onClick={onDelete}>
      <Icon name="delete" />
    </Button>
  );
}
