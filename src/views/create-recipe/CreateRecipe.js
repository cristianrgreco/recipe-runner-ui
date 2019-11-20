import React, {useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

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
            <Route exact path="/create-recipe">
                <Redirect to="/create-recipe/step-1"/>
            </Route>

            <Route exact path="/create-recipe/step-1">
                <Step1
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    serves={serves} setServes={setServes}
                    image={image} setImage={setImage}
                />
            </Route>

            <Route exact path="/create-recipe/step-2" render={() => {
                if (hasCompletedRequiredSteps()) {
                    return <Step2 equipment={equipment} setEquipment={setEquipment}/>;
                } else {
                    return <Redirect to="/create-recipe/step-1"/>
                }
            }}>
            </Route>

            <Route exact path="/create-recipe/step-3" render={() => {
                if (hasCompletedRequiredSteps()) {
                    return <Step3 ingredients={ingredients} setIngredients={setIngredients}/>;
                } else {
                    return <Redirect to="/create-recipe/step-1"/>
                }
            }}>
            </Route>

            <Route exact path="/create-recipe/step-4" render={() => {
                if (hasCompletedRequiredSteps()) {
                    return <Step4 method={method} setMethod={setMethod}/>
                } else {
                    return <Redirect to="/create-recipe/step-1"/>
                }
            }}>
            </Route>

            <Route exact path="/create-recipe/review" render={() => {
                if (hasCompletedRequiredSteps()) {
                    return <Step5
                        name={name}
                        description={description}
                        serves={serves}
                        image={image}
                        equipment={equipment}
                        ingredients={ingredients}
                        method={method}
                    />
                } else {
                    return <Redirect to="/create-recipe/step-1"/>
                }
            }}>
            </Route>
        </Switch>
    );
}
