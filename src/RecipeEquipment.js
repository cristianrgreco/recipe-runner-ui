import styles from "./Recipe.module.css";
import SubHeading from "./components/SubHeading";
import { List, ListItem } from "./components/List";
import Input from "./components/Input";
import React from "react";

export default ({ recipe, showCheckboxes = true }) => {
  return (
    <div className={styles.RecipeBody_Requirements_Equipment}>
      <div className={styles.Recipe_Heading}>
        <SubHeading>Equipment</SubHeading>
      </div>
      <div className={styles.RecipeBody_Requirements_Equipment_Body}>
        <List>
          {recipe.equipment.map((equipmentItem) => (
            <ListItem key={equipmentItem}>
              {showCheckboxes ? (
                <label>
                  <Input type="checkbox" />
                  <span>{equipmentItem}</span>
                </label>
              ) : (
                <span>{equipmentItem}</span>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
