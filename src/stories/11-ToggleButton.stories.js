import React from "react";
import { action } from "@storybook/addon-actions";
import ToggleButton from "../components/ToggleButton";

export default {
  title: "Toggle Button",
};

export const first = () => (
  <div style={{ padding: "10px" }}>
    <ToggleButton
      selected="Option 1"
      option1="Option 1"
      onOption1={action("Option 1 selected")}
      option2="Option 2"
      onOption2={action("Option 2 selected")}
    />
  </div>
);

export const second = () => (
  <div style={{ padding: "10px" }}>
    <ToggleButton
      selected="Option 2"
      option1="Option 1"
      onOption1={action("Option 1 selected")}
      option2="Option 2"
      onOption2={action("Option 2 selected")}
    />
  </div>
);
