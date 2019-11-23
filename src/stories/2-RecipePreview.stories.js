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
    <RecipePreview recipe={recipe()}/>
);

export const isEditable = () => (
    <RecipePreview loggedIn={true} recipe={recipe({isEditable: true})}/>
);
