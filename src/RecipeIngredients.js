import styles from "./Recipe.module.css";
import SubHeading from "./components/SubHeading";
import { List, ListItem } from "./components/List";
import Input from "./components/Input";
import React from "react";

export default ({ recipe, showCheckboxes = true }) => {
  return (
    <div className={styles.RecipeBody_Requirements_Ingredients}>
      <div className={styles.Recipe_Heading}>
        <SubHeading>Ingredients</SubHeading>
      </div>
      <div className={styles.RecipeBody_Requirements_Ingredients_Body}>
        <List>
          {recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>
              {showCheckboxes ? (
                <label>
                  <Input type="checkbox" />
                  <span>{ingredient}</span>
                </label>
              ) : (
                <span>{ingredient}</span>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
