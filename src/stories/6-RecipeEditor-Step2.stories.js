import React from "react";
import {addDecorator} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {routerDecorator} from "./decorators";
import {recipe} from "./data";
import Step1 from "../views/recipe-editor/Step1";
import Step2 from "../views/recipe-editor/Step2";

export default {
    title: 'Recipe Editor - Step 2'
};

addDecorator(routerDecorator);

const aRecipe = recipe();

export const createEmpty = () => (
    <Step2
        isEdit={false}
        equipment={[]}
        setEquipment={action("setEquipment")}
    />
);

export const createComplete = () => (
    <Step2
        isEdit={false}
        equipment={aRecipe.equipment}
        setEquipment={action("setEquipment")}
    />
);

export const edit = () => (
    <Step2
        isEdit={true}
        equipment={aRecipe.equipment}
        setEquipment={action("setEquipment")}
    />
);
