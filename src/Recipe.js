import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Recipe.module.css";
import { formatTime } from "./time";
import RecipeRunner from "./RecipeRunner";
import { Button } from "./components/Button";
import { deleteRecipe, fetchRecipe } from "./api";
import { Icon } from "./components/Icon";
import Input from "./components/Input";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import { List, ListItem } from "./components/List";
import PLACEHOLDER_RECIPE from "./recipePlaceholder";

export default function Recipe({ loggedIn, recipe: recipeFromProps }) {
  const [recipe, setRecipe] = useState(undefined);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const { recipeId } = useParams();

  useEffect(() => {
    if (recipeFromProps) {
      setRecipe(recipeFromProps);
    } else {
      const timeout = setTimeout(() => {
        setRecipe(PLACEHOLDER_RECIPE);
        setSlow(true);
      }, 250);
      fetchRecipe(recipeId).then((recipe) => {
        clearTimeout(timeout);
        setRecipe(recipe);
        setReady(true);
      });
    }
  }, []);

  if (!recipe) {
    return <div />;
  }

  let className = "";
  if (!ready && slow) {
    className = styles.Placeholder;
  } else if (ready && slow) {
    className = styles.FadeIn;
  }

  return (
    <Fragment>
      <div className={`${className} ${styles.Container}`}>
        <Helmet>
          <title>{recipe.name}</title>
          <meta name="description" content={recipe.description} />
          <meta property="og:image" content={recipe.imageThumbnail} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:title" content={recipe.name} />
          <meta property="og:description" content={recipe.description} />
        </Helmet>
        <RecipeHeader loggedIn={loggedIn} recipe={recipe} />
        <RecipeDetails recipe={recipe} />
        <div className={styles.RecipeBody}>
          <div className={styles.RecipeBody_Requirements}>
            {recipe.equipment.length > 0 && <RecipeEquipment recipe={recipe} />}
            {recipe.ingredients.length > 0 && <RecipeIngredients recipe={recipe} />}
          </div>
          <div className={styles.RecipeBody_Method}>
            <div className={styles.Recipe_Heading}>
              <SubHeading>Method</SubHeading>
            </div>
            <div className={styles.RecipeBody_Method_Body}>
              {started ? (
                <RecipeRunner recipe={recipe} />
              ) : (
                <Fragment>
                  <RecipeMethod recipe={recipe} />
                  <Button onClick={() => setStarted(true)}>Run</Button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function RecipeHeader({ recipe, loggedIn }) {
  const history = useHistory();
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    setIsDeleting(true);
    await deleteRecipe(recipe.id);
    history.push("/");
  };

  const share = async () => {
    await navigator.share({
      text: recipe.description,
      title: recipe.name,
      url: window.location.href,
    });
  };

  return (
    <div className={styles.RecipeHeader}>
      <div className={styles.RecipeHeader_Image}>
        <img src={recipe.image} alt="" crossOrigin="anonymous" />
      </div>
      <div className={styles.RecipeHeader_Info}>
        <div className={styles.RecipeHeader_Info_NameContainer}>
          <div className={styles.RecipeHeader_Info_NameContainer_Name}>
            <Heading>{recipe.name}</Heading>
            {navigator.share && (
              <div className={`${styles.Recipe_Share}`}>
                <Button floating secondary onClick={share}>
                  <Icon name="share" />
                </Button>
              </div>
            )}
          </div>
          {loggedIn && recipe.isEditable && (
            <div className={styles.RecipeHeader_Info_NameContainer_Controls}>
              <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                <Link to={{ pathname: `/recipe-editor`, state: { recipe } }}>
                  <Button floating>
                    <Icon name="edit" />
                  </Button>
                </Link>
              </div>
              <div className={styles.RecipeDetailsNameContainer_Controls_Item}>
                {isDeleting ? (
                  <Button floating danger loading />
                ) : (
                  <Button floating danger confirm={<Icon name="check" />} onClick={onClickDelete}>
                    <Icon name="delete" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.Recipe_Heading}`}>
          <SubHeading>About this recipe</SubHeading>
        </div>
        <div className={styles.RecipeHeader_Info_Description}>{recipe.description}</div>
      </div>
    </div>
  );
}

function RecipeDetails({ recipe }) {
  return (
    <div className={styles.RecipeDetails}>
      <RecipeDetail value={recipe.serves} label="Serves" />
      <RecipeDetail value={formatTime(recipe.duration)} label="Duration" />
      <RecipeDetail value={recipe.ingredients.length} label="Ingredients" />
    </div>
  );
}

function RecipeDetail({ value, label }) {
  return (
    <div className={styles.RecipeDetails_InfoItem}>
      <div className={styles.RecipeDetails_InfoItem_Value}>{value}</div>
      <div className={styles.RecipeDetails_InfoItem_Label}>{label}</div>
    </div>
  );
}

function RecipeEquipment({ recipe }) {
  return (
    <div className={styles.RecipeBody_Requirements_Equipment}>
      <div className={styles.Recipe_Heading}>
        <SubHeading>Equipment</SubHeading>
      </div>
      <div className={styles.RecipeBody_Requirements_Equipment_Body}>
        <List>
          {recipe.equipment.map((equipmentItem) => (
            <ListItem key={equipmentItem}>
              <label>
                <Input type="checkbox" />
                <span>{equipmentItem}</span>
              </label>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

function RecipeIngredients({ recipe }) {
  return (
    <div className={styles.RecipeBody_Requirements_Ingredients}>
      <div className={styles.Recipe_Heading}>
        <SubHeading>Ingredients</SubHeading>
      </div>
      <div className={styles.RecipeBody_Requirements_Ingredients_Body}>
        <List>
          {recipe.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>
              <label>
                <Input type="checkbox" />
                <span>{ingredient}</span>
              </label>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

function RecipeMethod({ recipe }) {
  return (
    <List>
      <RecipeMethodItem methodItem={recipe.method} depth={"1"} />
    </List>
  );
}

function RecipeMethodItem({ methodItem, depth }) {
  const incrementDepth = (depth, amount) => {
    return `${depth.slice(0, -1) + (Number(depth.slice(-1)) + amount)}`;
  };

  return (methodItem || []).map((aMethodItem, methodItemIndex) => (
    <Fragment key={aMethodItem.instruction}>
      <ListItem>{aMethodItem.instruction}</ListItem>
      <RecipeMethodItem methodItem={aMethodItem.next} depth={incrementDepth(depth, methodItemIndex) + ".1"} />
    </Fragment>
  ));
}
