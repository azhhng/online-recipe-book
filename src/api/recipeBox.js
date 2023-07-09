import axios from "axios";

export const removeRecipeBox = async (recipeBoxId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}`
  );
  console.log(response);
  console.log("Deleting a recipe box...");
  return response;
};

export const addRecipeBox = async (userSub, boxBody) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe-box`,
    boxBody
  );
  console.log(response);
  console.log("Creating a recipe box...");
  return response;
};

export const editRecipeBox = async (recipeBoxId, boxBody) => {
  const response = await axios.put(
    `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${recipeBoxId}`,
    boxBody
  );
  console.log(response);
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
