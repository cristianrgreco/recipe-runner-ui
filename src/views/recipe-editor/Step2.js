import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./RecipeEditor.module.css";
import {Button} from "../../components/Button";
import {Icon} from "../../components/Icon";
import Input from "../../components/Input";

export default function Step2({isEdit, equipment, setEquipment}) {
    const [equipmentItem, setEquipmentItem] = useState('');
    const history = useHistory();

    const onEquipmentItemChange = e => {
        setEquipmentItem(e.target.value);
    };

    const onEdit = equipmentItem => e => {
        const index = equipment.findIndex(anEquipmentItem => anEquipmentItem === equipmentItem);
        const updatedEquipment = [...equipment.slice(0, index), e.target.value, ...equipment.slice(index + 1)];
        setEquipment(updatedEquipment);
    };

    const onDelete = equipmentItem => () => {
        setEquipment(equipment.filter(anEquipmentItem => anEquipmentItem !== equipmentItem));
    };

    const onClickBack = () => {
        history.push('/recipe-editor/step-1');
    };

    const onClickNext = () => {
        history.push('/recipe-editor/step-3');
    };

    const onSubmit = async e => {
        e.preventDefault();
        setEquipment([...equipment, equipmentItem]);
        setEquipmentItem('');
    };

    return (
        <div className={styles.Container}>
            <form onSubmit={onSubmit}>
                <div className={styles.Heading}>{isEdit ? 'Edit Recipe' : 'Create Recipe'} (2/5)</div>
                {equipment.length > 0 && (
                    <div className="row">
                        <div className="input-field col s12 m12 l6">
                            <ul className={`${styles.Collection} collection`}>
                                {equipment.map((equipmentItem, i) => (
                                    <li key={i} className={`${styles.Collection_Item} collection-item`}>
                                        <div className={styles.Collection_Item_Content}>
                                            <Input type="text" required value={equipmentItem} onChange={onEdit(equipmentItem)}/>
                                        </div>
                                        <div className={styles.Collection_Item_Controls}>
                                            <Button danger floating onClick={onDelete(equipmentItem)}>
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
                        <Input id="equipment-item" type="text" autoFocus={true} required value={equipmentItem} onChange={onEquipmentItemChange}/>
                        <label htmlFor="equipment-item">Equipment</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <Button type="submit">Add</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
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