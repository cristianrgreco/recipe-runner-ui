import React from "react";
import {addDecorator} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {routerDecorator} from "./decorators";
import {recipe} from "./data";
import Step4 from "../views/recipe-editor/Step4";
import Step5 from "../views/recipe-editor/Step5";
import Step1 from "../views/recipe-editor/Step1";

export default {
    title: 'Recipe Editor - Step 5'
};

addDecorator(routerDecorator);

const aRecipe = recipe();

export const create = () => (
    <Step5
        isEdit={false}
        id={'id'}
        name={aRecipe.name}
        description={aRecipe.description}
        serves={aRecipe.serves}
        image={aRecipe.image}
        equipment={aRecipe.equipment}
        ingredients={aRecipe.ingredients}
        method={aRecipe.method}
    />
);

export const edit = () => (
    <Step5
        isEdit={true}
        id={'id'}
        name={aRecipe.name}
        description={aRecipe.description}
        serves={aRecipe.serves}
        image={aRecipe.image}
        equipment={aRecipe.equipment}
        ingredients={aRecipe.ingredients}
        method={aRecipe.method}
    />
);
