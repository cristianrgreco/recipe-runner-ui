import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import { Link } from "react-router-dom";
import React from "react";

export default function EditRecipeButton({ recipe }) {
  return (
    <Link to={{ pathname: `/recipe-editor`, state: { recipe } }}>
      <Button floating>
        <Icon name="edit" />
      </Button>
    </Link>
  );
}
