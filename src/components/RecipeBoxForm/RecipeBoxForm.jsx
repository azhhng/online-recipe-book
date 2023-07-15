import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./RecipeBoxForm.scss";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { FoodEmoji } from "../../enums/Emojis";
import Emoji from "../Emoji/Emoji";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { splitUserSub } from "../../helpers/stringHelpers";
import { addRecipeBox, editRecipeBox } from "../../api/recipeBox";

function RecipeBoxForm(props) {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const [name, setName] = useState(props.box?.name ?? "");
  const [description, setDescription] = useState(props.box?.description ?? "");
  const [color, setColor] = useState(props.box?.color ?? "#8fafe3");
  const [emoji, setEmoji] = useState(props.box?.emoji ?? FoodEmoji.AVOCADO);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let emojiColor = "#fad017";

  const createRecipeBox = async () => {
    try {
      await addRecipeBox(userSub, { name, description, emoji, color });
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  const updateRecipeBox = async () => {
    try {
      await editRecipeBox(props.box.recipe_box_id, {
        name,
        description,
        emoji,
        color,
      });
      props.setEditingRecipeBox(false);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="recipe-box-form-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <div>
        <form className="recipe-box-form">
          <input
            type="text"
            id="recipe-box-name"
            value={name}
            placeholder="Name..."
            onChange={(event) => setName(event.target.value)}
          ></input>
          <textarea
            type="text"
            id="recipe-box-description"
            value={description}
            placeholder="Description..."
            rows="4"
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div
            className="emoji-holder"
            onClick={(e) => {
              e.preventDefault();
              setOpenEmojiPicker(true);
            }}
          >
            <Emoji
              type={"food"}
              name={emoji}
              width={30}
              height={30}
              style={{
                border: `2px solid ${emojiColor}`,
                padding: "5px",
                borderRadius: "10px",
                cursor: "pointer",
                margin: "5px",
              }}
            />
          </div>
          {openEmojiPicker && (
            <EmojiPicker
              setEmoji={setEmoji}
              setOpenEmojiPicker={setOpenEmojiPicker}
            />
          )}
          <input
            type="color"
            id="favcolor"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          ></input>
        </form>
      </div>

      {props.action === "edit" && (
        <button
          id="form-button"
          onClick={() => props.setEditingRecipeBox(false)}
        >
          Cancel
        </button>
      )}
      {props.action === "edit" && (
        <button id="form-button" onClick={() => updateRecipeBox()}>
          Update
        </button>
      )}
      {props.action === "create" && (
        <button
          id="form-button"
          onClick={() => props.setCreatingRecipeBox(false)}
        >
          Cancel
        </button>
      )}
      {props.action === "create" && (
        <button id="form-button" onClick={() => createRecipeBox()}>
          Create
        </button>
      )}
    </div>
  );
}

export default RecipeBoxForm;
