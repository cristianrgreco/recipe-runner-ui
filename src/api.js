import axios from "axios";
import { getJwtToken, isLoggedIn } from "./auth";

const URL = process.env.REACT_APP_SERVER_URL;

const headers = async () => {
  const headers = {};

  if (await isLoggedIn()) {
    headers["Authorization"] = `Bearer ${await getJwtToken()}`;
  }

  return headers;
};

export const fetchRecipe = async (recipeId) => {
  const response = await axios.get(`${URL}/recipes/${recipeId}`, { headers: await headers() });
  return response.data;
};

export const fetchRecipes = async () => {
  const response = await axios.get(`${URL}/recipes`, { headers: await headers() });
  return response.data;
};

const uploadImage = async (image) => {
  const uploadUrlResponse = await axios.get(`${URL}/upload-url`, {
    headers: await headers(),
    params: { contentType: image.type },
  });
  const uploadUrl = uploadUrlResponse.data.uploadUrl;

  await axios.put(uploadUrl, image);

  return uploadUrl.split("?")[0];
};

export const saveRecipe = async (recipe, image) => {
  const imageUrl = image instanceof File ? await uploadImage(image) : image; // todo image is always a URL now, can we handle it or should we also set the image object?

  const recipeWithImage = { ...recipe, image: imageUrl };
  const response = await axios.post(`${URL}/recipes`, recipeWithImage, { headers: await headers() });

  return response.headers.location;
};

export const updateRecipe = async (id, recipe, image) => {
  const imageUrl = image instanceof File ? await uploadImage(image) : image;

  const recipeWithImage = { ...recipe, image: imageUrl };
  const response = await axios.post(`${URL}/recipes/${id}`, recipeWithImage, { headers: await headers() });

  return response.headers.location;
};

export const deleteRecipe = async (recipeId) => {
  await axios.delete(`${URL}/recipes/${recipeId}`, { headers: await headers() });
};
