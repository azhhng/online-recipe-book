import axios from "axios";
import { getTokenHeader } from "./tokenHeader";
const header = await getTokenHeader();

export const removeRecipeBox = async (recipeBoxId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}`,
    header
  );
  console.log("Deleting a recipe box...");
  return response;
};

export const retrieveRecipeBox = async (recipeBoxId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}`
  );
  console.log("Getting a recipe box...");
  return response;
};

export const addRecipeBox = async (userSub, boxBody) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe-box`,
    boxBody,
    header
  );
  console.log("Creating a recipe box...");
  return response;
};

export const editRecipeBox = async (recipeBoxId, boxBody) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}`,
    boxBody,
    header
  );
  console.log("Updating a recipe box...");
  return response;
};

export const getAllUserRecipeBoxes = async (userSub) => {
  const recipeBoxes = (
    await axios.get(
      `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe-box`
    )
  ).data;
  console.log("Getting all of user's recipe boxes...");
  return recipeBoxes;
};

export const getRecipeBoxRecipes = async (recipeBoxId) => {
  const recipes = (
    await axios.get(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}/recipes`
    )
  ).data;
  console.log("Getting all of the recipes for a recipe box...");
  return recipes;
};
