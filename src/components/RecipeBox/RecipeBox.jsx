import "./RecipeBox.scss";
import React, { useState } from "react";
import axios from "axios";
import CreateRecipeForm from "../CreateRecipeForm/CreateRecipeForm";
import EditRecipeBoxForm from "../EditRecipeBoxForm/EditRecipeBoxForm";
import Emoji from "../Emoji/Emoji";
import { SymbolEmoji } from "../../enums/Emojis";

function RecipeBox(props) {
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  const [editingRecipeBox, setEditingRecipeBox] = useState(false);

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
      <button onClick={() => setAddingRecipeToBox(true)}>
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.PAGE}
          width={30}
          height={30}
        />
      </button>
      <button onClick={() => setEditingRecipeBox(true)}>
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.PENCIL}
          width={30}
          height={30}
        />
      </button>
      <button onClick={() => deleteRecipeBox()}>
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.FIRE}
          width={30}
          height={30}
        />
      </button>
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      <h3># Recipes: {props.recipes.length}</h3>
      {addingRecipeToBox && (
        <CreateRecipeForm
          recipeBox={props.box}
          sourcePage={"RecipeBox"}
          setAddingRecipeToBox={setAddingRecipeToBox}
        />
      )}
      {editingRecipeBox && (
        <EditRecipeBoxForm
          box={props.box}
          sourcePage={"RecipeBox"}
          setEditingRecipeBox={setEditingRecipeBox}
        />
      )}
    </div>
  );
}

export default RecipeBox;
