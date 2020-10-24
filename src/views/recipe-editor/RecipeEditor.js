import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ConditionalRoute from "../../components/ConditionalRoute";
import Step1, { PLACEHOLDER_IMAGE } from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function RecipeEditor({ location: { state = {} } }) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serves, setServes] = useState("");
  const [image, setImage] = useState(PLACEHOLDER_IMAGE);
  const [imageType, setImageType] = useState("");
  const [crop, setCrop] = useState({ aspect: 1, unit: "%", width: 100, height: 100, keepSelection: true }); // todo make placeholder image square
  const [equipment, setEquipment] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);

  useEffect(() => {
    if (state.recipe) {
      setIsEdit(true);
      setId(state.recipe.id);
      setName(state.recipe.name);
      setDescription(state.recipe.description);
      setServes(state.recipe.serves);
      setImage(state.recipe.image);
      setCrop(state.recipe.crop);
      setEquipment(state.recipe.equipment);
      setIngredients(state.recipe.ingredients);
      setMethod(state.recipe.method);
    }
  }, []);

  const hasImageChanged = !state.recipe || state.recipe.image !== image;
  const hasCropChanged =
    !state.recipe ||
    state.recipe.crop.x !== crop.x ||
    state.recipe.crop.y !== crop.y ||
    state.recipe.crop.width !== crop.width ||
    state.recipe.crop.height !== crop.height;
  const requiresImageUpload = hasImageChanged || hasCropChanged;
  const hasCompletedRequiredSteps = name !== "" && description !== "" && serves !== "" && image !== "";

  return (
    <Switch>
      <Route exact path="/recipe-editor" render={() => <Redirect to="/recipe-editor/step-1" />} />
      <Route
        exact
        path="/recipe-editor/step-1"
        render={() => (
          <Step1
            isEdit={isEdit}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            serves={serves}
            setServes={setServes}
            image={image}
            setImage={setImage}
            setImageType={setImageType}
            crop={crop}
            setCrop={setCrop}
          />
        )}
      />
      <ConditionalRoute
        exact
        path="/recipe-editor/step-2"
        condition={hasCompletedRequiredSteps}
        true={(props) => <Step2 isEdit={isEdit} equipment={equipment} setEquipment={setEquipment} {...props} />}
        false={(props) => <Redirect to="/recipe-editor/step-1" {...props} />}
      />
      <ConditionalRoute
        exact
        path="/recipe-editor/step-3"
        condition={hasCompletedRequiredSteps}
        true={(props) => <Step3 isEdit={isEdit} ingredients={ingredients} setIngredients={setIngredients} {...props} />}
        false={(props) => <Redirect to="/recipe-editor/step-1" {...props} />}
      />
      <ConditionalRoute
        exact
        path="/recipe-editor/step-4"
        condition={hasCompletedRequiredSteps}
        true={(props) => <Step4 isEdit={isEdit} method={method} setMethod={setMethod} {...props} />}
        false={(props) => <Redirect to="/recipe-editor/step-1" {...props} />}
      />
      <ConditionalRoute
        exact
        path="/recipe-editor/step-5"
        condition={hasCompletedRequiredSteps}
        true={(props) => (
          <Step5
            isEdit={isEdit}
            id={id}
            name={name}
            description={description}
            serves={serves}
            image={image}
            crop={crop}
            equipment={equipment}
            ingredients={ingredients}
            method={method}
            requiresImageUpload={requiresImageUpload}
            {...props}
          />
        )}
        false={(props) => <Redirect to="/recipe-editor/step-1" {...props} />}
      />
    </Switch>
  );
}
