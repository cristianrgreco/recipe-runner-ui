import React from "react";
import RecipePreview from "../RecipePreview";
import {addDecorator} from "@storybook/react";
import {routerDecorator} from "./decorators";
import {recipe} from "./data";

export default {
    title: 'Recipe Preview'
};

addDecorator(routerDecorator);

export const standard = () => (
    <RecipePreview loggedIn={false} recipe={recipe()}/>
);

export const loggedIn = () => (
    <RecipePreview loggedIn={true} loggedInEmail="anotheruser@domain.com" recipe={recipe()}/>
);

export const loggedInAndOwnsRecipe = () => (
    <RecipePreview loggedIn={true} loggedInEmail="user@domain.com" recipe={recipe()}/>
);
