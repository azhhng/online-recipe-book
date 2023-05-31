import "./RecipeBox.scss";
import React from "react";
import CreateRecipeForm from "../CreateRecipeForm/CreateRecipeForm";

function RecipeBox(props) {
  return (
    <div className="recipe-box">
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      <h3># Recipes: {props.recipes.length}</h3>
      <CreateRecipeForm recipeBox={props.box} sourcePage={"RecipeBox"} />
    </div>
  );
}

export default RecipeBox;
