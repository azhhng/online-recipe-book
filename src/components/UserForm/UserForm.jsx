import React, { useState } from "react";
import "./UserForm.scss";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import axios from "axios";
import { FoodEmoji } from "../../enums/Emojis";
import Emoji from "../Emoji/Emoji";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function UserForm(props) {
  const [name, setName] = useState(props.user?.name ?? "");
  const [color, setColor] = useState(props.user?.color ?? "#8fafe3");
  const [emoji, setEmoji] = useState(props.user?.emoji ?? FoodEmoji.AVOCADO);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let emojiColor = "#fad017";

  const createUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/user/${props.userId}`,
        {
          name,
          color,
          emoji,
        }
      );
      console.log("Creating user...");
      console.log(response);
      props.setIsUserFormOpen(false);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_ADDRESS}/user/${props.userId}`,
        {
          name,
          color,
          emoji,
        }
      );
      console.log("Updating user...");
      console.log(response);
      props.setIsUserFormOpen(false);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="user-form-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <form className="user-form">
        <input
          type="text"
          id="user-name"
          value={name}
          placeholder="Name..."
          onChange={(event) => setName(event.target.value)}
        ></input>
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
      <button
        onClick={() => {
          props.setIsUserFormOpen(false);
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          if (props.userInDatabase) {
            updateUser();
          } else {
            createUser();
          }
        }}
      >
        Save
      </button>
    </div>
  );
}

export default UserForm;
