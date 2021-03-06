import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export default {
  title: "Button",
};

export const primary = () => <Button onClick={action("clicked")}>Primary</Button>;

export const secondary = () => (
  <Button secondary onClick={action("clicked")}>
    Secondary
  </Button>
);

export const danger = () => (
  <Button danger onClick={action("clicked")}>
    Danger
  </Button>
);

export const large = () => (
  <Button large onClick={action("clicked")}>
    Large
  </Button>
);

export const floating = () => (
  <Button floating onClick={action("clicked")}>
    F
  </Button>
);

export const floatingConfirm = () => (
  <Button danger floating confirm={<Icon name="check" />} onClick={action("clicked")}>
    <Icon name="delete" />
  </Button>
);

export const spinner = () => (
  <Button spinner onClick={action("clicked")}>
    Spinner
  </Button>
);

export const confirm = () => (
  <Button confirm="Are you sure?" onClick={action("clicked")}>
    Confirm
  </Button>
);

export const confirmWithIcon = () => {
  return (
    <Button
      confirm={
        <div>
          <Icon name="delete" position={"left"} />
          Confirm
        </div>
      }
      onClick={action("clicked")}
    >
      <Icon name="delete" />
    </Button>
  );
};
