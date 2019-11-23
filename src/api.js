import axios from "axios";
import {getJwtToken, isLoggedIn} from "./auth";

const URL = process.env.REACT_APP_SERVER_URL;

const headers = async () => {
    const headers = {};

    if (await isLoggedIn()) {
        headers['Authorization'] = `Bearer ${await getJwtToken()}`
    }

    return headers;
};

export const fetchRecipe = async recipeId => {
    const response = await axios.get(`${URL}/recipes/${recipeId}`, {headers: await headers()});
    return response.data;
};

export const fetchRecipes = async () => {
    const response = await axios.get(`${URL}/recipes`, {headers: await headers()});
    return response.data;
};

export const saveRecipe = async (recipe, image) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('recipe', JSON.stringify(recipe));

    const response = await axios.post(`${URL}/recipes`, formData,
        {
            headers: {
                ...(await headers()),
                'content-type': 'multipart/form-data'
            }
        }
    );

    return response.headers.location;
};

export const updateRecipe = async (id, recipe, image) => {
    let updatedRecipe = {...recipe};

    const formData = new FormData();
    if (image instanceof File) {
        formData.append('image', image);
    } else {
        updatedRecipe.image = image;
    }
    formData.append('recipe', JSON.stringify(updatedRecipe));

    const response = await axios.put(`${URL}/recipes/${id}`, formData,
        {
            headers: {
                ...(await headers()),
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response.headers.location;
};

export const deleteRecipe = async recipeId => {
    await axios.delete(`${URL}/recipes/${recipeId}`,
        {
            headers: await headers()
        }
    );
};
