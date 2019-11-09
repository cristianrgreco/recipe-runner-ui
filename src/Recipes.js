import React, {useState, useEffect} from 'react';
import './Recipes.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {formatTime} from "./time";
import config from './config';
import {Icon} from "./components/Icon";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/recipes`);
        return response.data;
    };

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    return (
        <div className="Recipes">
            {recipes.map(recipe => (
                <Recipe recipe={recipe}/>
            ))}
        </div>
    );
}

function Recipe({recipe}) {
    return (
        <div className="Recipe">
            <div className="RecipeImage">
                <img src={recipe.image} alt=""/>
            </div>
            <div className="RecipeDetailsContainer">
                <div className="RecipeDetails">
                    <div className={`RecipeDetailsName ${config.primary}-text text-${config.primaryAlteration}`}>
                        {recipe.name}
                    </div>
                    <div className="RecipeDetailsDescription">
                        {recipe.description}
                    </div>
                    <div className="RecipeDetailsInfo">
                        <RecipeDetailInfoItem value={recipe.serves} label="Serves"/>
                        <RecipeDetailInfoItem value={formatTime(recipe.duration)} label="Duration"/>
                        <RecipeDetailInfoItem value={recipe.ingredients.length} label="Ingredients"/>
                    </div>
                </div>
                <Link to={`/recipes/${recipe._id}`}>
                    <div className={`RecipeDetailsLink ${config.primary} ${config.primaryAlteration} white-text`}>
                        <span>
                            View Recipe
                        </span>
                        <span>
                            <Icon name="keyboard_arrow_right" position="right"/>
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

function RecipeDetailInfoItem({value, label}) {
    return (
        <div className="RecipeDetailsInfoItem">
            <div className={`RecipeDetailsInfoItemValue ${config.primary}-text ${config.primaryAlteration}`}>
                {value}
            </div>
            <div className="RecipeDetailsInfoItemLabel">
                {label}
            </div>
        </div>
    );
}
