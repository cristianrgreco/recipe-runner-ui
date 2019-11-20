import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import ConditionalRoute from "../../components/ConditionalRoute";

export default function CreateRecipe() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serves, setServes] = useState('');
    const [image, setImage] = useState('');
    const [equipment, setEquipment] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);

    const hasCompletedRequiredSteps = () => {
        return name !== ''
            && description !== ''
            && serves !== ''
            && image !== ''
    };

    return (
        <Switch>
            <Route exact path="/create-recipe" render={() => <Redirect to="/create-recipe/step-1"/>}/>
            <Route exact path="/create-recipe/step-1" render={() => (
                <Step1
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    serves={serves} setServes={setServes}
                    image={image} setImage={setImage}
                />
            )}/>
            <ConditionalRoute
                condition={hasCompletedRequiredSteps()}
                true={() => <Step2 equipment={equipment} setEquipment={setEquipment}/>}
                false={() => <Redirect to="/create-recipe/step-1"/>}
            />
            <ConditionalRoute
                condition={hasCompletedRequiredSteps()}
                true={() => <Step3 ingredients={ingredients} setIngredients={setIngredients}/>}
                false={() => <Redirect to="/create-recipe/step-1"/>}
            />
            <ConditionalRoute
                condition={hasCompletedRequiredSteps()}
                true={() => <Step4 method={method} setMethod={setMethod}/>}
                false={() => <Redirect to="/create-recipe/step-1"/>}
            />
            <ConditionalRoute
                condition={hasCompletedRequiredSteps()}
                true={() => <Step5
                    name={name}
                    description={description}
                    serves={serves}
                    image={image}
                    equipment={equipment}
                    ingredients={ingredients}
                    method={method}
                />}
                false={() => <Redirect to="/create-recipe/step-1"/>}
            />
        </Switch>
    );
}
