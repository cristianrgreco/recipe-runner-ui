import { List, ListItem } from "./components/List";
import React, { Fragment } from "react";

export default ({ recipe }) => {
  return (
    <List>
      <RecipeMethodItem methodItem={recipe.method} depth={"1"} />
    </List>
  );
};

function RecipeMethodItem({ methodItem, depth }) {
  const incrementDepth = (depth, amount) => {
    return `${depth.slice(0, -1) + (Number(depth.slice(-1)) + amount)}`;
  };

  return (methodItem || []).map((aMethodItem, methodItemIndex) => (
    <Fragment key={aMethodItem.instruction}>
      <ListItem>{aMethodItem.instruction}</ListItem>
      <RecipeMethodItem methodItem={aMethodItem.next} depth={incrementDepth(depth, methodItemIndex) + ".1"} />
    </Fragment>
  ));
}
