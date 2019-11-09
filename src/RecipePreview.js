import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {formatTime} from "./time";

export default function RecipePreview({recipe}) {
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <i className="material-icons" style={{verticalAlign: 'bottom'}}>person</i>
                    <span style={{verticalAlign: 'bottom'}}>{recipe.serves}</span>
                </div>
                <div className="col">
                    <i className="material-icons" style={{verticalAlign: 'bottom'}}>timer</i>
                    <span style={{verticalAlign: 'bottom'}}>{formatTime(recipe.duration)}</span>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6 no-padding">
                    <img src={recipe.image} className="responsive-img"/>
                </div>
            </div>
            <div className="row">
                {recipe.equipment.length > 0 && (
                    <Fragment>
                        <h3 className="header">Equipment</h3>
                        <ul className="collection">
                            {recipe.equipment.map(item =>
                                <li key={item} className="collection-item">
                                    <label>
                                        <input type="checkbox"/>
                                        <span>{item}</span>
                                    </label>
                                </li>
                            )}
                        </ul>
                    </Fragment>
                )}
            </div>
            <div className="row">
                {recipe.ingredients.length > 0 && (
                    <Fragment>
                        <h3 className="header">Ingredients</h3>
                        <ul className="collection">
                            {recipe.ingredients.map(ingredient =>
                                <li key={ingredient} className="collection-item">
                                    <label>
                                        <input type="checkbox"/>
                                        <span>{ingredient}</span>
                                    </label>
                                </li>
                            )}
                        </ul>
                    </Fragment>
                )}
            </div>
            <div className="row">
                <Link to={`/recipes/${recipe._id}/start`} className="waves-effect waves-light red lighten-2 btn-large">
                    <i className="material-icons left">sentiment_very_satisfied</i>
                    I'm ready!
                </Link>
            </div>
        </Fragment>
    );
}
