import React, {Fragment, createRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {methodDuration} from "./duration";

export default function () {
    const [name, setName] = useState("");
    const [serves, setServes] = useState(0);
    const [image, setImage] = useState(undefined);
    const [equipment, setEquipment] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);
    const history = useHistory();

    const recipe = {
        name,
        duration: methodDuration(method),
        serves,
        equipment,
        ingredients,
        method
    };

    const save = async () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('recipe', JSON.stringify(recipe));

        const response = await axios.post(
            'http://localhost:8000/recipes',
            formData,
            {headers: {'content-type': 'multipart/form-data'}}
        );

        history.push(response.headers.location);
    };

    return (
        <Fragment>
            <h1 className="header">Create Recipe</h1>
            <form className="col s12">
                <div className="row">
                    <Name name={name} setName={setName}/>
                </div>
                <div className="row">
                    <Serves serves={serves} setServes={setServes}/>
                </div>
                <div className="row">
                    <Image image={image} setImage={setImage}/>
                </div>
                <div className="section">
                    <Equipment equipment={equipment} setEquipment={setEquipment}/>
                </div>
                <div className="section">
                    <Ingredients ingredients={ingredients} setIngredients={setIngredients}/>
                </div>
                <div className="section">
                    <Method method={method} setMethod={setMethod}/>
                </div>
                <div className="section">
                    <div className="btn-large red lighten-2 right" onClick={save}>
                        <i className="material-icons left">save</i>
                        <span>Save</span>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}

function Name({name, setName}) {
    const onChange = e => setName(e.target.value);

    return (
        <div className="input-field col s12">
            <input id="name" type="text" className="validate" autoFocus={true} value={name} onChange={onChange}/>
            <label htmlFor="name">Name</label>
        </div>
    );
}

function Serves({setServes}) {
    const onChange = e => setServes(Number(e.target.value));

    return (
        <div className="input-field col s12">
            <input id="serves" type="number" className="validate" onChange={onChange}/>
            <label htmlFor="serves">Serves</label>
        </div>
    );
}

function Image({image, setImage}) {
    const inputRef = createRef();

    const onChange = () => {
        setImage(inputRef.current.files[0]);
    };

    return (
        <Fragment>
            <div className="file-field input-field col s12">
                <div className="btn red lighten-2">
                    <span>Image</span>
                    <input type="file" ref={inputRef} onChange={onChange}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" id="image" type="text"/>
                </div>
            </div>
            <div className="col s12 m6">
                {image !== undefined && <img src={URL.createObjectURL(image)} className="responsive-img"/>}
            </div>
        </Fragment>
    );
}

function Equipment({equipment, setEquipment}) {
    const inputRef = createRef();

    const add = () => {
        const newItem = inputRef.current.value;
        inputRef.current.value = "";
        setEquipment(equipment => [...equipment, newItem]);
    };

    const remove = itemToRemove => {
        setEquipment(equipment => equipment.filter(equipmentItem => equipmentItem !== itemToRemove));
    };

    return (
        <Fragment>
            <h2>Equipment</h2>
            <div className="row">
                <div className="col s12">
                    {equipment.length > 0 && (
                        <ul className="collection">
                            {equipment.map(item => (
                                <li key={item} className="collection-item">
                                    <div className="valign-wrapper" style={{display: 'flex'}}>
                                        <span style={{flex: '1'}}>{item}</span>
                                        <div className="btn-floating red lighten-2" style={{justifySelf: 'flex-end'}}
                                             onClick={() => remove(item)}>
                                            <i className="material-icons">delete</i>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="equipment" type="text" className="validate" ref={inputRef}/>
                    <label htmlFor="equipment">Equipment</label>
                    <div className="btn red lighten-2" onClick={add}>
                        <span>Add</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function Ingredients({ingredients, setIngredients}) {
    const inputRef = createRef();

    const add = () => {
        const newItem = inputRef.current.value;
        inputRef.current.value = "";
        setIngredients(ingredients => [...ingredients, newItem]);
    };

    const remove = itemToRemove => {
        setIngredients(ingredients => ingredients.filter(ingredient => ingredient !== itemToRemove));
    };

    return (
        <Fragment>
            <h2>Ingredients</h2>
            <div className="row">
                <div className="col s12">
                    {ingredients.length > 0 && (
                        <ul className="collection">
                            {ingredients.map(item => (
                                <li key={item} className="collection-item">
                                    <div className="valign-wrapper" style={{display: 'flex'}}>
                                        <span style={{flex: '1'}}>{item}</span>
                                        <div className="btn-floating red lighten-2" onClick={() => remove(item)}>
                                            <i className="material-icons">delete</i>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="ingredients" type="text" className="validate" ref={inputRef}/>
                    <label htmlFor="ingredients">Ingredients</label>
                    <div className="btn red lighten-2" onClick={add}>
                        <span>Add</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function Method({method, setMethod}) {
    return (
        <Fragment>
            <h2>Method</h2>
            <MethodItem method={method} setMethod={setMethod}/>
        </Fragment>
    );
}

function MethodItem({method, setMethod, i = 0}) {
    const instructionInputRef = createRef();
    const timerInputRef = createRef();
    const timerDescriptionInputRef = createRef();

    const add = () => {
        const instruction = instructionInputRef.current.value;
        instructionInputRef.current.value = "";

        const timer = Number(timerInputRef.current.value) * 1000;
        timerInputRef.current.value = "";

        const timerDescription = timerDescriptionInputRef.current.value;
        timerDescriptionInputRef.current.value = "";

        const methodItem = timer !== 0
            ? {instruction, alarm: {duration: timer, description: timerDescription}, next: []}
            : {instruction, next: []};

        method.push(methodItem);
        setMethod(currentMethod => [...currentMethod]);
    };

    const remove = itemToRemove => {
        const index = method.findIndex(item => item === itemToRemove);
        method.splice(index, 1);
        setMethod(currentMethod => [...currentMethod]);
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col s12">
                    {method.length > 0 && (
                        <ul className="collection">
                            {method.map((item, j) => (
                                <li key={item.instruction} className="collection-item">
                                    <div className="valign-wrapper" style={{display: 'flex'}}>
                                        <span style={{flex: '1'}}>{item.instruction}</span>
                                        <div className="btn-floating red lighten-2" onClick={() => remove(item)}>
                                            <i className="material-icons">delete</i>
                                        </div>
                                    </div>
                                    <MethodItem method={item.next} setMethod={setMethod} i={(i + 1 * j + 1) + 1}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id={`method-${i}`} type="text" className="validate" ref={instructionInputRef}/>
                    <label htmlFor={`method-${i}`}>Method</label>
                </div>
                <div className="input-field col s6">
                    <input id={`timer-${i}`} type="number" className="validate" ref={timerInputRef} placeholder={0}/>
                    <label htmlFor={`timer-${i}`}>Timer (seconds)</label>
                </div>
                <div className="input-field col s6">
                    <input id={`timer-description-${i}`} type="text" className="validate"
                           ref={timerDescriptionInputRef}/>
                    <label htmlFor={`timer-description-${i}`}>Description</label>
                </div>
                <div className="col s12">
                    <div className="btn red lighten-2" onClick={add}>
                        <span>Add</span>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
