import React, {Fragment, createRef, useState} from 'react';
import Header from "./components/Header";

export default function () {
    const [imageSrc, setImageSrc] = useState(undefined);
    const [equipment, setEquipment] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [method, setMethod] = useState([]);

    return (
        <Fragment>
            <Header>Create Recipe</Header>
            <form className="col s12">
                <div className="row">
                    <Name/>
                </div>
                <div className="row">
                    <Serves/>
                </div>
                <div className="row">
                    <Image imageSrc={imageSrc} setImageSrc={setImageSrc}/>
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
            </form>
        </Fragment>
    );
}

function Name() {
    return (
        <div className="input-field col s12">
            <input id="name" type="text" className="validate" autoFocus={true}/>
            <label htmlFor="name">Name</label>
        </div>
    );
}

function Serves() {
    return (
        <div className="input-field col s12">
            <input id="serves" type="number" className="validate"/>
            <label htmlFor="serves">Serves</label>
        </div>
    );
}

function Image({imageSrc, setImageSrc}) {
    const inputRef = createRef();

    const onImageChange = () => {
        setImageSrc(URL.createObjectURL(inputRef.current.files[0]));
    };

    return (
        <Fragment>
            <div className="file-field input-field col s12">
                <div className="btn red lighten-2">
                    <span>Image</span>
                    <input type="file" ref={inputRef} onChange={onImageChange}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" id="image" type="text"/>
                </div>
            </div>
            <div className="col s12 m6">
                {imageSrc !== undefined && <img src={imageSrc} className="responsive-img"/>}
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
                                    <span>{item}</span>
                                    <div className="btn-floating red lighten-2" onClick={() => remove(item)}>
                                        <i className="material-icons">delete</i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
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
                                    <span>{item}</span>
                                    <div className="btn-floating red lighten-2" onClick={() => remove(item)}>
                                        <i className="material-icons">delete</i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
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
    const inputRef = createRef();

    const add = () => {
        const instruction = inputRef.current.value;
        inputRef.current.value = "";
        method.push({instruction, next: []});
        setMethod(currentMethod => [...currentMethod]);
    };

    const remove = itemToRemove => {
        const index = method.findIndex(item => item !== itemToRemove);
        method.splice(index, 1);
        setMethod(currentMethod => [...currentMethod]);
    };

    return (
        <div className="row">
            <div className="col s12">
                {method.length > 0 && (
                    <ul className="collection">
                        {method.map((item, j) => (
                            <li key={item.instruction} className="collection-item">
                                <span>{item.instruction}</span>
                                <div className="btn-floating red lighten-2" onClick={() => remove(item)}>
                                    <i className="material-icons">delete</i>
                                </div>
                                <MethodItem method={item.next} setMethod={setMethod} i={(i + 1 * j + 1) + 1}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="input-field col s12">
                <input id={`method-${i}`} type="text" className="validate" ref={inputRef}/>
                <label htmlFor={`method-${i}`}>Method</label>
                <div className="btn red lighten-2" onClick={add}>
                    <span>Add</span>
                </div>
            </div>
        </div>
    );
}
