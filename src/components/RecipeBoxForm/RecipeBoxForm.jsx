import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./RecipeBoxForm.scss";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { FoodEmoji } from "../../enums/Emojis";
import Emoji from "../Emoji/Emoji";

function RecipeBoxForm(props) {
  const { user } = useAuth0();
  const [name, setName] = useState(props.box?.name ?? "");
  const [description, setDescription] = useState(props.box?.description ?? "");
  const [color, setColor] = useState(props.box?.color ?? "#8fafe3");
  const [emoji, setEmoji] = useState(props.box?.emoji ?? FoodEmoji.AVOCADO);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  let emojiColor = "#fad017";

  const createRecipeBox = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`,
      {
        name,
        description,
        emoji,
        color,
      }
    );
    console.log("Creating a recipe box...");
    console.log(response);
    window.location.reload();
  };

  const updateRecipeBox = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`,
      {
        description: description,
        emoji: emoji,
        name: name,
        color: color,
      }
    );
    props.setEditingRecipeBox(false);
    console.log("Updating a recipe...");
    console.log(response);
    window.location.reload();
  };

  return (
    <div className="recipe-box-form-container">
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
        <button onClick={() => props.setEditingRecipeBox(false)}>
          <span>Cancel</span>
        </button>
      )}
      {props.action === "edit" && (
        <button onClick={() => updateRecipeBox()}>
          <span>Update</span>
        </button>
      )}
      {props.action === "create" && (
        <button onClick={() => createRecipeBox()}>
          <span>Create</span>
        </button>
      )}
    </div>
  );
}

export default RecipeBoxForm;
