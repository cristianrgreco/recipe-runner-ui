import React from "react";
import {addDecorator} from "@storybook/react";
import {routerDecorator} from "./decorators";
import Recipes from "../Recipes";

export default {
    title: 'Recipes'
};

addDecorator(routerDecorator);

export const standard = () => (
    <Recipes loggedIn={false}/>
);

export const loggedIn = () => (
    <Recipes loggedIn={true} loggedInEmail="anotheruser@domain.com"/>
);
