import axios from "axios";
import { getTokenHeader } from "./tokenHeader";
const header = await getTokenHeader();

export const removeRecipe = async (recipeId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_ADDRESS}/recipe/${recipeId}`,
    header
  );
  console.log("Deleting a recipe...");
  return response;
};

export const addRecipe = async (userSub, boxBody) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe`,
    boxBody,
    header
  );
  console.log("Creating a recipe...");
  return response;
};

export const editRecipe = async (recipeId, boxBody) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_ADDRESS}/recipe/${recipeId}`,
    boxBody,
    header
  );
  console.log("Updating a recipe...");
  return response;
};

export const getAllUserRecipes = async (userSub) => {
  const recipes = (
    await axios.get(
      `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe`
    )
  ).data;
  console.log("Getting all of user's recipes...");
  return recipes;
};
