import React, { Fragment, useState } from "react";
import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import { deleteRecipe } from "./api";

export default function DeleteRecipeButton({ recipe, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    setIsDeleting(true);
    await deleteRecipe(recipe.id);
    onDelete();
  };

  return (
    <Fragment>
      {isDeleting ? (
        <Button floating danger loading />
      ) : (
        <Button floating danger confirm={<Icon name="check" />} onClick={onClickDelete}>
          <Icon name="delete" />
        </Button>
      )}
    </Fragment>
  );
}
