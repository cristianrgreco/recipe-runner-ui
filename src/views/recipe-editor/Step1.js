import React, {createRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./RecipeEditor.module.css";
import {Button} from "../../components/Button";

export default function Step1({isEdit, name, setName, description, setDescription, serves, setServes, image, setImage}) {
    const history = useHistory();
    const imageInputRef = createRef();

    useEffect(() => {
        window.M.updateTextFields();
        window.M.textareaAutoResize(document.querySelector('#description'));
    });

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
        history.push('/recipe-editor/step-2');
    };

    const isFormValid = () => {
        return name !== ''
            && description !== ''
            && serves !== ''
            && image !== ''
    };

    const getImageUrl = () => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        } else {
            return image;
        }
    };

    const getImageName = () => {
        if (image instanceof File) {
            return image.name;
        } else {
            return image;
        }
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>{isEdit ? 'Edit Recipe' : 'Create Recipe'} (1/5)</div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="name" type="text" autoFocus={true} required value={name} onChange={onNameChange}/>
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <input id="serves" type="number" required min="0" step="1" value={serves} onChange={onServesChange}/>
                        <label htmlFor="serves">Serves</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m12 l6">
                        <textarea id="description" className="materialize-textarea" required value={description} onChange={onDescriptionChange}/>
                        <label htmlFor="description">Description</label>
                    </div>
                </div>
                <div className="row">
                    <div className="file-field input-field col s12 m12 l6">
                        <Button secondary>
                            <span>Image</span>
                            <input type="file" ref={imageInputRef} onChange={onImageChange}/>
                        </Button>
                        <div className="file-path-wrapper">
                            <input value={getImageName()} readOnly type="text"/>
                        </div>
                    </div>
                </div>
                {image !== '' && (
                    <div className="row">
                        <div className="col s12 m12 l6">
                            <img src={getImageUrl()} alt="recipe" className="responsive-img"/>
                        </div>
                    </div>
                )}
                <div className="row">
                    <div className="input-field col s12">
                        <Button disabled={!isFormValid()} type="submit">Next</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
