import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export const fetchRecipe = async recipeId => {
    const response = await axios.get(`${URL}/recipes/${recipeId}`);
    return response.data;
};

export const fetchRecipes = async () => {
    const response = await axios.get(`${URL}/recipes`);
    return response.data;
};

export const saveRecipe = async (recipe, image) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('recipe', JSON.stringify(recipe));

    const response = await axios.post(
        `${URL}/recipes`,
        formData,
        {headers: {'content-type': 'multipart/form-data'}}
    );

    return response.headers.location;
};
