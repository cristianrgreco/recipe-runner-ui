import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./CreateRecipe.module.css";
import {Button} from "../../components/Button";
import {Icon} from "../../components/Icon";

export default function Step2({equipment, setEquipment}) {
    const [equipmentItem, setEquipmentItem] = useState('');
    const history = useHistory();

    const onEquipmentItemChange = e => {
        setEquipmentItem(e.target.value);
    };

    const onDelete = equipmentItem => () => {
        setEquipment(equipment.filter(anEquipmentItem => anEquipmentItem !== equipmentItem));
    };

    const onClickBack = () => {
        history.push('/create-recipe/step-1');
    };

    const onClickNext = () => {
        history.push('/create-recipe/step-3');
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
                                        <div>
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