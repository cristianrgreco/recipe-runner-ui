import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import React from "react";
import { useHistory } from "react-router-dom";

export default ({ meal, setMeal, recipe }) => {
  const history = useHistory();

  const isRecipeInMeal = meal.some((mealItem) => mealItem.id === recipe.id);

  const addToMeal = () => {
    setMeal((meal) => [...meal, recipe]);
    history.push("/meal");
  };

  return (
    <Button secondary onClick={addToMeal}>
      <Icon name={"add"} position="left" />
      Meal
    </Button>
  );
};
