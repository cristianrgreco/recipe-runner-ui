import React from "react";
import {addDecorator} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {routerDecorator} from "./decorators";
import {recipe} from "./data";
import Step3 from "../views/recipe-editor/Step3";

export default {
    title: 'Recipe Editor - Step 3'
};

addDecorator(routerDecorator);

const aRecipe = recipe();

export const createEmpty = () => (
    <Step3
        isEdit={false}
        ingredients={[]}
        setIngredients={action("setIngredients")}
    />
);

export const createComplete = () => (
    <Step3
        isEdit={false}
        ingredients={aRecipe.ingredients}
        setIngredients={action("setIngredients")}
    />
);

export const edit = () => (
    <Step3
        isEdit={true}
        ingredients={aRecipe.ingredients}
        setIngredients={action("setIngredients")}
    />
);
