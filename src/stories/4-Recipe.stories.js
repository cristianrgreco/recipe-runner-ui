import React from "react";
import { addDecorator } from "@storybook/react";
import { routerDecorator } from "./decorators";
import Recipe from "../Recipe";
import { recipe } from "./data";

export default {
  title: "Recipe",
};

addDecorator(routerDecorator);

export const standard = () => <Recipe recipe={recipe} meal={[]} />;

export const isEditable = () => <Recipe loggedIn={true} recipe={recipe({ isEditable: true })} meal={[]} />;
