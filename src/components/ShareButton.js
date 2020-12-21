import React, { Fragment } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

export default function ShareButton({ recipe }) {
  const share = async () => {
    await navigator.share({
      text: recipe.description,
      title: recipe.name,
      url: window.location.href,
    });
  };

  return (
    <Fragment>
      {navigator.share && (
        <Button floating secondary onClick={share}>
          <Icon name="share" />
        </Button>
      )}
    </Fragment>
  );
}
