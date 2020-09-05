import React from "react";
import { addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { routerDecorator } from "./decorators";
import { recipe } from "./data";
import Step1 from "../views/recipe-editor/Step1";

export default {
  title: "Recipe Editor - Step 1",
};

addDecorator(routerDecorator);

const aRecipe = recipe();

export const createEmpty = () => (
  <Step1
    isEdit={false}
    name={""}
    setName={action("setName")}
    description={""}
    setDescription={action("setDescription")}
    serves={""}
    setServes={action("setServes")}
    image={""}
    setImage={action("setImage")}
  />
);

export const createComplete = () => (
  <Step1
    isEdit={false}
    name={aRecipe.name}
    setName={action("setName")}
    description={aRecipe.description}
    setDescription={action("setDescription")}
    serves={aRecipe.serves}
    setServes={action("setServes")}
    image={aRecipe.image}
    setImage={action("setImage")}
  />
);

export const edit = () => (
  <Step1
    isEdit={true}
    name={aRecipe.name}
    setName={action("setName")}
    description={aRecipe.description}
    setDescription={action("setDescription")}
    serves={aRecipe.serves}
    setServes={action("setServes")}
    image={aRecipe.image}
    setImage={action("setImage")}
  />
);
