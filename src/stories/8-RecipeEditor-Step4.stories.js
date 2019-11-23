import React from "react";
import {addDecorator} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {routerDecorator} from "./decorators";
import {recipe} from "./data";
import Step4 from "../views/recipe-editor/Step4";

export default {
    title: 'Recipe Editor - Step 4'
};

addDecorator(routerDecorator);

const aRecipe = recipe();

export const createEmpty = () => (
    <Step4
        isEdit={false}
        method={[]}
        setMethod={action("setMethod")}
    />
);

export const createComplete = () => (
    <Step4
        isEdit={false}
        method={aRecipe.method}
        setMethod={action("setMethod")}
    />
);

export const edit = () => (
    <Step4
        isEdit={true}
        method={aRecipe.method}
        setMethod={action("setMethod")}
    />
);
