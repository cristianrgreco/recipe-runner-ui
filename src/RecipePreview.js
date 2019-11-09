import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {formatTime} from "./time";
import {Icon} from "./components/Icon";
import {H2} from "./components/Heading";
import {Button} from "./components/Button";

export default function RecipePreview({recipe}) {
    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <Icon name="person" style={{verticalAlign: 'bottom'}}/>
                    <span style={{verticalAlign: 'bottom'}}>{recipe.serves}</span>
                </div>
                <div className="col">
                    <Icon name="timer" style={{verticalAlign: 'bottom'}}/>
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
                        <H2>Equipment</H2>
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
                        <H2>Ingredients</H2>
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
                <Link to={`/recipes/${recipe._id}/start`}>
                    <Button large>
                        <Icon name="sentiment_very_satisfied" position="left"/>I'M READY!
                    </Button>
                </Link>
            </div>
        </Fragment>
    );
}
