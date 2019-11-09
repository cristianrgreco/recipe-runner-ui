import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {formatTime} from "./time";
import {H1, H2} from "./components/Heading";
import config from './config';

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
        <Fragment>
            <H1>Recipes</H1>
            {recipes.length > 0 && (
                <div className="section">
                    <ul className="collection">
                        {recipes.map(recipe => (
                            <li key={recipe.name} className={`collection-item avatar ${config.color} lighten-2`}>
                                <Link to={`/recipes/${recipe._id}`} className="white-text">
                                    <img src={recipe.image} alt="" className="circle"/>
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
