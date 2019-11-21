import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ConditionalRoute from "../../components/ConditionalRoute";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

export default function RecipeEditor(props) {
    const recipe = (props.location.state && props.location.state.recipe) || undefined;

    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(undefined);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serves, setServes] = useState('');
    const [image, setImage] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);

    useEffect(() => {
        if (recipe) {
            setIsEdit(true);
            setId(recipe.id);
            setName(recipe.name);
            setDescription(recipe.description);
            setServes(recipe.serves);
            setImage(recipe.image);
            setEquipment(recipe.equipment);
            setIngredients(recipe.ingredients);
            setMethod(recipe.method);
        }
    }, []);

    const hasCompletedRequiredSteps = () => {
        return name !== ''
            && description !== ''
            && serves !== ''
            && image !== ''
    };

    return (
        <Switch>
            <Route exact path="/recipe-editor" render={() => <Redirect to="/recipe-editor/step-1"/>}/>
            <Route exact path="/recipe-editor/step-1" render={() => (
                <Step1
                    isEdit={isEdit}
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    serves={serves} setServes={setServes}
                    image={image} setImage={setImage}
                />
            )}/>
            <ConditionalRoute
                exact
                path="/recipe-editor/step-2"
                condition={hasCompletedRequiredSteps()}
                true={props => <Step2 isEdit={isEdit} equipment={equipment} setEquipment={setEquipment} {...props}/>}
                false={props => <Redirect to="/recipe-editor/step-1" {...props}/>}
            />
            <ConditionalRoute
                exact
                path="/recipe-editor/step-3"
                condition={hasCompletedRequiredSteps()}
                true={props => <Step3 isEdit={isEdit} ingredients={ingredients} setIngredients={setIngredients} {...props}/>}
                false={props => <Redirect to="/recipe-editor/step-1" {...props}/>}
            />
            <ConditionalRoute
                exact
                path="/recipe-editor/step-4"
                condition={hasCompletedRequiredSteps()}
                true={props => <Step4 isEdit={isEdit} method={method} setMethod={setMethod} {...props}/>}
                false={props => <Redirect to="/recipe-editor/step-1" {...props}/>}
            />
            <ConditionalRoute
                exact
                path="/recipe-editor/step-5"
                condition={hasCompletedRequiredSteps()}
                true={props => <Step5
                    isEdit={isEdit}
                    id={id}
                    name={name}
                    description={description}
                    serves={serves}
                    image={image}
                    equipment={equipment}
                    ingredients={ingredients}
                    method={method}
                    {...props}
                />}
                false={props => <Redirect to="/recipe-editor/step-1" {...props}/>}
            />
        </Switch>
    );
}
