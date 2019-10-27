import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {formatTime} from "./time";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const response = await axios.get(`http://${process.env.REACT_APP_SERVER}/recipes`);
        return response.data;
    };

    useEffect(() => {
        fetchRecipes().then(recipes => setRecipes(recipes));
    }, []);

    return (
        <Fragment>
            <h1 className="header">Recipes</h1>
            {recipes.length > 0 && (
                <div className="section">
                    <ul className="collection">
                        {recipes.map(recipe => (
                            <li key={recipe.name} className="collection-item avatar red lighten-2">
                                <Link to={`/recipes/${recipe._id}`} className="white-text">
                                    <img src={`http://${process.env.REACT_APP_SERVER}/public/${recipe.image}`} alt="" className="circle"/>
                                    <strong><span className="title">{recipe.name}</span></strong>
                                    <p>
                                        Serves {recipe.serves} people
                                        <br/>
                                        Takes {formatTime(recipe.duration)}
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
