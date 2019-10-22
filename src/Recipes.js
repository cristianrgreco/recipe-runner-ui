import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {RECIPES} from "./data";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => new Promise(resolve => setTimeout(() => resolve(RECIPES), 250));

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    });

    return (
        <Fragment>
            <h1 className="header">Recipe List</h1>
            <p className="caption">
                Select a recipe from the list below.
            </p>
            {recipes.length > 0 && (
                <div className="section">
                    <ul className="collection">
                        {recipes.map(recipe => (
                            <li key={recipe.name} className="collection-item avatar red lighten-2">
                                <Link to={`/recipes/${recipe.id}`} className="white-text">
                                    <img src={`/img/${recipe.image}`} alt="" className="circle"/>
                                    <strong><span className="title">{recipe.name}</span></strong>
                                    <p>
                                        Serves {recipe.serves} people
                                        <br/>
                                        Takes {Math.ceil(recipe.duration / 60 / 60)} minutes
                                    </p>
                                    <i className="secondary-content white-text material-icons left">arrow_forward</i>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Fragment>
    );
}
