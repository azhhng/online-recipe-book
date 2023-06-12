import "./RecipeBox.scss";
import React, { useState } from "react";
import axios from "axios";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipeBoxForm from "../RecipeBoxForm/RecipeBoxForm";
import Emoji from "../Emoji/Emoji";
import { adjustBrightness } from "../../helpers/colorHelpers";
import ActionsBar from "../ActionsBar/ActionsBar";

function RecipeBox(props) {
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  const [editingRecipeBox, setEditingRecipeBox] = useState(false);
  const darkerColor = adjustBrightness(props.box.color, -80);

  const deleteRecipeBox = async () => {
    // TODO create box that alerts users that all recipes are going to be deleted as well
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`
    );
    console.log(response);
    console.log("Deleting a recipe box...");
    window.location.reload();
  };

  // TODO fix tool tip
  return (
    <div className="recipe-box">
      <Emoji
        type={"food"}
        name={props.box.emoji}
        width={30}
        height={30}
        style={{
          backgroundColor: props.box.color,
          border: `2px solid ${darkerColor}`,
        }}
      />
      <ActionsBar
        source={"RecipeBox"}
        setAdd={setAddingRecipeToBox}
        setEditing={setEditingRecipeBox}
        delete={deleteRecipeBox}
      />
      <h4 className="recipe-box-name">{props.box.name}</h4>
      <h4>{props.box.description}</h4>
      <h3># Recipes: {props.recipes.length}</h3>
      {addingRecipeToBox && (
        <RecipeForm
          action={"create"}
          recipeBox={props.box}
          setAddingRecipeToBox={setAddingRecipeToBox}
        />
      )}
      {editingRecipeBox && (
        <RecipeBoxForm
          action={"edit"}
          box={props.box}
          setEditingRecipeBox={setEditingRecipeBox}
        />
      )}
    </div>
  );
}

export default RecipeBox;
