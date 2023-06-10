import React, { useState } from "react";
import axios from "axios";
import "./EditRecipeBoxForm.scss";
import Emoji from "../Emoji/Emoji";
import EmojiPicker from "../EmojiPicker/EmojiPicker";

function EditRecipeBoxForm(props) {
  const [name, setName] = useState(props.box.name);
  const [description, setDescription] = useState(props.box.description);
  const [color, setColor] = useState(props.box.color);
  const [emoji, setEmoji] = useState(props.box.emoji);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  let emojiColor = "#fad017";

  const fieldsToUpdate = {};

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
            onChange={(event) => {
              fieldsToUpdate["name"] = event.target.value;
              setName(event.target.value);
            }}
          ></input>
          <textarea
            type="text"
            id="recipe-box-description"
            value={description}
            placeholder="Description..."
            onChange={(event) => {
              fieldsToUpdate["description"] = event.target.value;
              setDescription(event.target.value);
            }}
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
      <button onClick={() => props.setEditingRecipeBox(false)}>
        <span>Cancel</span>
      </button>
      <button onClick={() => updateRecipeBox()}>
        <span>Update</span>
      </button>
    </div>
  );
}

export default EditRecipeBoxForm;
