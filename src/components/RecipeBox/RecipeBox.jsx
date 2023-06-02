import "./RecipeBox.scss";
import React, { useState } from "react";
import axios from "axios";
import CreateRecipeForm from "../CreateRecipeForm/CreateRecipeForm";
import Emoji from "../Emoji/Emoji";
import { SymbolEmoji } from "../../enums/Emojis";

function RecipeBox(props) {
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  const [editingRecipeBox, setEditingRecipeBox] = useState(false);

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

  const addRecipeToBox = async () => {
    setAddingRecipeToBox(true);
  };

  const deleteRecipeBox = async () => {
    // TODO create box that alerts users that all recipes are going to be deleted as well
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`
    );
    console.log(response);
    console.log("Deleting a recipe...");
  };

  // TODO fix tool tip
  return (
    <div className="recipe-box">
      <button onClick={() => addRecipeToBox()}>
        <Emoji name={SymbolEmoji.PAGE} width={30} height={30} />
      </button>
      <button onClick={() => updateRecipeBox()}>
        <Emoji name={SymbolEmoji.PENCIL} width={30} height={30} />
      </button>
      <button onClick={() => deleteRecipeBox()}>
        <Emoji name={SymbolEmoji.FIRE} width={30} height={30} />
      </button>
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      <h3># Recipes: {props.recipes.length}</h3>
      {addingRecipeToBox && (
        <CreateRecipeForm recipeBox={props.box} sourcePage={"RecipeBox"} />
      )}
      <button onClick={() => updateRecipeBox()}>
        <span>Update Recipe Box</span>
      </button>
    </div>
  );
}

export default RecipeBox;
