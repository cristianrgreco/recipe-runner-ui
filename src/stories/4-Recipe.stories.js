import React from "react";
import {addDecorator} from "@storybook/react";
import {routerDecorator} from "./decorators";
import Recipe from "../Recipe";
import {recipe} from "./data";

export default {
    title: 'Recipe'
};

addDecorator(routerDecorator);

export const standard = () => (
    <Recipe loggedIn={false} location={{state: {recipe: recipe()}}} />
);

export const loggedIn = () => (
    <Recipe loggedIn={true} loggedInEmail="anotheruser@domain.com" location={{state: {recipe: recipe()}}} />
);

export const loggedInAndOwnsRecipe = () => (
    <Recipe loggedIn={true} loggedInEmail="user@domain.com" location={{state: {recipe: recipe()}}} />
);
