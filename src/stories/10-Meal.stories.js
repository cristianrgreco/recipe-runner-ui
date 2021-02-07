import React from "react";
import { addDecorator } from "@storybook/react";
import { routerDecorator } from "./decorators";
import { recipe } from "./data";
import Meal from "../Meal";

export default {
  title: "Meal",
};

addDecorator(routerDecorator);

const meal = [recipe({ name: "Recipe 1" }), recipe({ name: "Recipe 2" })];

export const standard = () => <Meal meal={meal} />;
