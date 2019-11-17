import React, {createRef, useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import styles from './CreateRecipe.module.css';
import {Button} from "./components/Button";
import {methodDuration} from "./duration";
import {Icon} from "./components/Icon";
import Badge from "./components/Badge";
import {formatTime} from "./time";
import RecipePreview from "./RecipePreview";
import Recipe from "./Recipe";

export default function CreateRecipe() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [serves, setServes] = useState('');
    const [image, setImage] = useState(undefined);
    const [equipment, setEquipment] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);

    return (
        <Switch>
            <Route exact path="/create-recipe-new">
                <Redirect to="/create-recipe-new/step-1"/>
            </Route>
            <Route exact path="/create-recipe-new/step-1">
                <Step1
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    serves={serves} setServes={setServes}
                    image={image} setImage={setImage}
                />
            </Route>
            <Route exact path="/create-recipe-new/step-2">
                <Step2 equipment={equipment} setEquipment={setEquipment}/>
            </Route>
            <Route exact path="/create-recipe-new/step-3">
                <Step3 ingredients={ingredients} setIngredients={setIngredients}/>
            </Route>
            <Route exact path="/create-recipe-new/step-4">
                <Step4 method={method} setMethod={setMethod}/>
            </Route>
            <Route exact path="/create-recipe-new/review">
                <Review
                    name={name}
                    description={description}
                    serves={serves}
                    image={image}
                    equipment={equipment}
                    ingredients={ingredients}
                    method={method}
                />
            </Route>
        </Switch>
    );
}

function Step1({name, setName, description, setDescription, serves, setServes, image, setImage}) {
    const history = useHistory();
    const imageInputRef = createRef();

    const onNameChange = e => {
        setName(e.target.value);
    };

    const onServesChange = e => {
        setServes(Number(e.target.value));
    };

    const onDescriptionChange = e => {
        setDescription(e.target.value);
    };

    const onImageChange = () => {
        setImage(imageInputRef.current.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        history.push('/create-recipe-new/step-2');
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Create Recipe (1/5)</div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="name" type="text" autoFocus={true} required value={name} onChange={onNameChange}/>
                        <label htmlFor="name" className={`${name.length > 0 ? 'active': ''}`}>Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="serves" type="number" required min="0" step="1" value={serves} onChange={onServesChange}/>
                        <label htmlFor="serves" className={`${serves !== '' ? 'active': ''}`}>Serves</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <textarea id="description" className="materialize-textarea" required value={description} onChange={onDescriptionChange}/>
                        <label htmlFor="description" className={`${description.length > 0 ? 'active': ''}`}>Description</label>
                    </div>
                </div>
                <div className="row">
                    <div className="file-field input-field col s12 m12 l6">
                        <Button secondary>
                            <span>Image</span>
                            <input type="file" ref={imageInputRef} onChange={onImageChange}/>
                        </Button>
                        <div className="file-path-wrapper">
                            <input value={image && image.name} className={`file-path ${name.length > 0 ? 'active': ''}`} type="text"/>
                        </div>
                    </div>
                </div>
                {image && (
                    <div className="row">
                        <div className="col s12 m12 l6">
                            <img src={URL.createObjectURL(image)} className="responsive-img"/>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="input-field col s12">
                        <Button type="submit">Next</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Step2({equipment, setEquipment}) {
    const [equipmentItem, setEquipmentItem] = useState('');
    const history = useHistory();

    const onEquipmentItemChange = e => {
        setEquipmentItem(e.target.value);
    };

    const onDelete = equipmentItem => () => {
        setEquipment(equipment.filter(anEquipmentItem => anEquipmentItem !== equipmentItem));
    };

    const onClickBack = () => {
        history.push('/create-recipe-new/step-1');
    };

    const onClickNext = () => {
        history.push('/create-recipe-new/step-3');
    };

    const onSubmit = async e => {
        e.preventDefault();
        setEquipment([...equipment, equipmentItem]);
        setEquipmentItem('');
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Create Recipe (2/5)</div>
                {equipment.length > 0 && (
                    <div className="row">
                        <div className="input-field col s12 m12 l6">
                            <ul className={`${styles.Collection} collection`}>
                                {equipment.map(equipmentItem => (
                                    <li key={equipmentItem} className={`${styles.Collection_Item} collection-item`}>
                                        <div className={styles.Collection_Item_Content}>
                                            {equipmentItem}
                                        </div>
                                        <div className={styles.Collection_Item_Controls}>
                                            <Button floating onClick={onDelete(equipmentItem)}>
                                                <Icon name="delete"/>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="equipment-item" type="text" autoFocus={true} required value={equipmentItem} onChange={onEquipmentItemChange}/>
                        <label htmlFor="equipment-item" className={`${equipmentItem.length > 0 ? 'active': ''}`}>Equipment</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Button type="submit">Add</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <div className={styles.ButtonsContainer}>
                            <Button secondary onClick={onClickBack}>Back</Button>
                            <Button onClick={onClickNext}>Next</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Step3({ingredients, setIngredients}) {
    const [ingredient, setIngredient] = useState('');
    const history = useHistory();

    const onIngredientChange = e => {
        setIngredient(e.target.value);
    };

    const onDelete = ingredient => () => {
        setIngredients(ingredients.filter(anIngredient => anIngredient !== ingredient));
    };

    const onClickBack = () => {
        history.push('/create-recipe-new/step-2');
    };

    const onClickNext = () => {
        history.push('/create-recipe-new/step-4');
    };

    const onSubmit = async e => {
        e.preventDefault();
        setIngredients([...ingredients, ingredient]);
        setIngredient('');
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>Create Recipe (3/5)</div>
                {ingredients.length > 0 && (
                    <div className="row">
                        <div className="input-field col s12 m12 l6">
                            <ul className={`${styles.Collection} collection`}>
                                {ingredients.map(ingredient => (
                                    <li key={ingredient} className={`${styles.Collection_Item} collection-item`}>
                                        <div className={styles.Collection_Item_Content}>
                                            {ingredient}
                                        </div>
                                        <div className={styles.Collection_Item_Controls}>
                                            <Button floating onClick={onDelete(ingredient)}>
                                                <Icon name="delete"/>
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="ingredient" type="text" autoFocus={true} required value={ingredient} onChange={onIngredientChange}/>
                        <label htmlFor="ingredient" className={`${ingredient.length > 0 ? 'active': ''}`}>Ingredients</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Button type="submit">Add</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <div className={styles.ButtonsContainer}>
                            <Button secondary onClick={onClickBack}>Back</Button>
                            <Button onClick={onClickNext}>Next</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Step4({method, setMethod}) {
    const history = useHistory();

    const onClickBack = () => {
        history.push('/create-recipe-new/step-3');
    };

    const onClickNext = () => {
        history.push('/create-recipe-new/review');
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Heading}>Create Recipe (4/5)</div>
            {method.length === 0
                ? <MethodItemForm method={method} setMethod={setMethod} depth={'1'}/>
                : <MethodItem method={method} setMethod={setMethod} depth={'1'}/>
            }
            <div className="row">
                <div className="input-field col s12 m12 l6">
                    <div className={styles.ButtonsContainer}>
                        <Button secondary onClick={onClickBack}>Back</Button>
                        <Button onClick={onClickNext}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MethodItem({method, setMethod, depth}) {
    const incrementDepth = (depth, amount) => {
        return `${depth.slice(0, -1) + (Number(depth.slice(-1)) + amount)}`
    };

    const onDelete = methodItem => () => {
        const methodItemIndex = method.findIndex(aMethodItem => aMethodItem === methodItem);
        method.splice(methodItemIndex, 1);
        setMethod(currentMethod => [...currentMethod]);
    };

    return (
        <div className={`${styles.Nested} ${depth === '1' ? styles.NestedFirst : ''}`}>
            <ul className={`${styles.NoMargin} ${styles.Collection} collection`}>
                {method.length > 0 && method.map((methodItem, methodItemIndex) => (
                    <li key={methodItem.instruction} className={`${styles.Collection_Item_Container} collection-item`}>
                        <div className={`${styles.Collection_Item}`}>
                            <div className={styles.Collection_Item_Content}>
                                <span className={styles.Collection_Item_Content_Depth}>
                                    Step {incrementDepth(depth, methodItemIndex)})
                                </span>
                                <span className={styles.Collection_Item_Content_Instruction}>
                                    {methodItem.instruction}
                                </span>
                                {methodItem.alarm && (
                                    <span className={styles.Collection_Item_Content_Duration}>
                                        <Badge>
                                            {formatTime(methodItem.alarm.duration)}
                                        </Badge>
                                    </span>
                                )}
                            </div>
                            <div className={styles.Collection_Item_Controls}>
                                <Button floating onClick={onDelete(methodItem)}>
                                    <Icon name="delete"/>
                                </Button>
                            </div>
                        </div>
                        <div className={styles.Collection_Nested}>
                            <MethodItem method={methodItem.next} setMethod={setMethod} depth={incrementDepth(depth, methodItemIndex) + '.1'}/>
                        </div>
                    </li>
                ))}
                <li className={`${styles.Collection_Item_Container} collection-item`}>
                    <MethodItemForm method={method} setMethod={setMethod} depth={incrementDepth(depth, method.length)}/>
                </li>
            </ul>
        </div>
    );
}

function MethodItemForm({method, setMethod, depth}) {
    const [instruction, setInstruction] = useState('');
    const [duration, setDuration] = useState('');
    const [durationUnit, setDurationUnit] = useState('minutes');

    useEffect(() => {
        window.M.FormSelect.init(document.querySelector(`#duration-unit-${elementId(depth)}`));
    });

    const elementId = () => depth.replace(/\./g, '_');

    const onInstructionChange = e => {
        setInstruction(e.target.value);
    };

    const onDurationChange = e => {
        setDuration(Number(e.target.value));
    };

    const onDurationUnitChange = e => {
        setDurationUnit(e.target.value);
    };

    const durationToMillis = () => {
        switch (durationUnit) {
            case 'seconds':
                return duration * 1000;
            case 'minutes':
                return duration * 60000;
            case 'hours':
                return duration * 3.6e+6;
        }
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (duration !== '') {
            method.push({
                instruction,
                alarm: {
                    duration: durationToMillis(),
                    description: ''
                },
                next: []
            });
        } else {
            method.push({
                instruction,
                next: []
            });
        }

        setMethod(currentMethod => [...currentMethod]);

        setInstruction('');
        setDuration('');
        setDurationUnit('minutes');
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id={`instruction-${elementId(depth)}`} autoFocus={true} className="materialize-textarea" required value={instruction} onChange={onInstructionChange}/>
                    <label htmlFor={`instruction-${elementId(depth)}`} className={`${instruction.length > 0 ? 'active': ''}`}>Step {depth}</label>
                </div>
                <div className="input-field col s12 m12 l6">
                    <input id={`duration-${elementId(depth)}`} type="number" min="0" step=".1" value={duration} onChange={onDurationChange}/>
                    <label htmlFor={`duration-${elementId(depth)}`} className={`${duration !== '' ? 'active': ''}`}>Duration (optional)</label>
                </div>
                <div className="input-field col s12 m12 l6">
                    <select id={`duration-unit-${elementId(depth)}`} disabled={duration === ''} value={durationUnit} onChange={onDurationUnitChange}>
                        <option value="seconds">Seconds</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <Button type="submit">Add</Button>
                </div>
            </div>
        </form>
    );
}

function Review({name, description, serves, image, equipment, ingredients, method}) {
    const history = useHistory();

    const recipe = {
        name,
        description,
        image: URL.createObjectURL(image),
        duration: methodDuration(method),
        serves,
        equipment,
        ingredients,
        method
    };

    const onClickBack = () => {
        history.push('/create-recipe-new/step-4');
    };

    const onClickPublish = () => {
        console.log('PUBLISH');
    };

    return (
        <div className={styles.Container}>
            <div className={styles.Heading}>Create Recipe (5/5)</div>
            <div className="row">
                <div className={styles.SubHeading}>Preview</div>
                <RecipePreview recipe={recipe}/>
            </div>
            <div className="row">
                <div className={styles.SubHeading}>Full</div>
                <Recipe recipe={recipe}/>
            </div>
            <div className="row">
                <div className="input-field col s12 m12 l6">
                    <div className={styles.ButtonsContainer}>
                        <Button secondary onClick={onClickBack}>Back</Button>
                        <Button onClick={onClickPublish}>Publish</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
