import React from "react";
import { action } from "@storybook/addon-actions";
import Nav from "../Nav";
import { addDecorator } from "@storybook/react";
import { routerDecorator } from "./decorators";
import { recipe } from "./data";

export default {
  title: "Nav",
};

addDecorator(routerDecorator);

export const standard = () => <Nav loggedIn={false} setLoggedIn={action("setLoggedIn")} meal={[]} />;

export const loggedIn = () => <Nav loggedIn={true} setLoggedIn={action("setLoggedIn")} meal={[]} />;

export const meal = () => {
  const aMeal = [recipe()];

  return <Nav loggedIn={false} setLoggedIn={action("setLoggedIn")} meal={aMeal} />;
};

export const lotsOfMeals = () => {
  const aMeal = [];
  for (let i = 0; i < 100; i++) {
    aMeal.push(recipe());
  }

  return <Nav loggedIn={false} setLoggedIn={action("setLoggedIn")} meal={aMeal} />;
};
