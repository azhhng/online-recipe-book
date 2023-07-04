import "./Recipe.scss";
import React, { useEffect, useState } from "react";
import Emoji from "../Emoji/Emoji";
import axios from "axios";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
import { adjustBrightness } from "../../helpers/colorHelpers";
import ActionsBar from "../ActionsBar/ActionsBar";
import RecipeForm from "../RecipeForm/RecipeForm";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function Recipe(props) {
  const [darkerColor, setDarkerColor] = useState("#fff");
  const [editingRecipe, setEditingRecipe] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDarkerColor(adjustBrightness(props.box.color, -80));
  }, [props]);

  const deleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}/recipe/${props.recipeId}`
      );
      console.log(response);
      console.log("Deleting a recipe...");
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="recipe-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <ActionsBar
        source={"Recipe"}
        setEditing={setEditingRecipe}
        delete={deleteRecipe}
      />
      <h3 id="recipe-name">{props.name}</h3>
      <h4 id="recipe-description">{props.description}</h4>
      <div className="recipe-box-tag">
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
      </div>
      {(props.favorite || props.hasMade) && (
        <div className="recipe-properties">
          {props.favorite && (
            <Emoji
              type={"symbols"}
              name={SymbolEmoji.SPARKLING_HEART}
              width={30}
              height={30}
            />
          )}
          {props.hasMade && (
            <Emoji
              type={"food"}
              name={FoodEmoji.FORK_KNIFE_PLATE}
              width={30}
              height={30}
            />
          )}
        </div>
      )}
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.LINK}
          width={30}
          height={30}
        />
      </a>
      {editingRecipe && (
        <RecipeForm
          action={"edit"}
          recipeId={props.recipeId}
          name={props.name}
          favorite={props.favorite}
          hasMade={props.hasMade}
          description={props.description}
          link={props.link}
          box={props.box}
          setEditingRecipe={setEditingRecipe}
        />
      )}
    </div>
  );
}

export default Recipe;
