import "./Recipe.scss";
import React, { useEffect, useState } from "react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
import { adjustBrightness } from "../../helpers/colorHelpers";
import ActionsBar from "../ActionsBar/ActionsBar";
import RecipeForm from "../RecipeForm/RecipeForm";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { removeRecipe } from "../../api/recipe";
import { userStore } from "../../stores/user";

function Recipe(props) {
  const userSub = userStore((state) => state.sub);

  const [sameUser, setSameUser] = useState(false);
  const [darkerColor, setDarkerColor] = useState("#fff");
  const [editingRecipe, setEditingRecipe] = useState(false);
  const [addingToOwnBox, setAddingToOwnBox] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDarkerColor(adjustBrightness(props.box.color, -80));
  }, [props]);

  useEffect(() => {
    if (userSub === props.box.user_id) {
      setSameUser(true);
    }
  }, [userSub, props.box.user_id]);

  const deleteRecipe = async () => {
    try {
      await removeRecipe(props.recipeId);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  const checkIfCanAddToOwnBox = () => {
    if (!userSub) {
      setShowError(true);
      setErrorMessage("Please log in to add this recipe!");
      return;
    }
    setAddingToOwnBox(true);
  };

  return (
    <div className="recipe-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      {sameUser ? (
        <ActionsBar
          source={"Recipe"}
          setEditing={setEditingRecipe}
          delete={deleteRecipe}
        />
      ) : (
        <ActionsBar
          source={"externalRecipeBox"}
          setAddingToOwnBox={setAddingToOwnBox}
          checkIfCanAddToOwnBox={checkIfCanAddToOwnBox}
        />
      )}
      <div className="text-container">
        <h3>{props.name}</h3>
        <h4 id="recipe-description">{props.description}</h4>
      </div>
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
      {addingToOwnBox && (
        <RecipeForm
          action={"addToOwnBox"}
          recipeId={props.recipeId}
          name={props.name}
          favorite={false}
          hasMade={false}
          description={""}
          link={props.link}
          box={props.box}
          setAddingToOwnBox={setAddingToOwnBox}
        />
      )}
    </div>
  );
}

export default Recipe;
