import "./RecipeBox.scss";
import React from "react";
import axios from "axios";
import CreateRecipeForm from "../CreateRecipeForm/CreateRecipeForm";

function RecipeBox(props) {
  const updateRecipeBox = async () => {
    // TODO allow users to choose how they update their recipe box
    const response = await axios.put(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`,
      {
        description: "Some of my favorite desserts!",
        name: "Yummy Desserts",
      }
    );
    console.log("Updating a recipe...");
    console.log(response);
  };

  return (
    <div className="recipe-box">
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      <h3># Recipes: {props.recipes.length}</h3>
      <CreateRecipeForm recipeBox={props.box} sourcePage={"RecipeBox"} />
      <button onClick={() => updateRecipeBox()}>
        <span>Update Recipe Box</span>
      </button>
    </div>
  );
}

export default RecipeBox;
