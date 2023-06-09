import React, { useEffect, useState } from "react";
import "./EmojiPicker.scss";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
import { adjustBrightness } from "../../helpers/colorHelpers";

function EmojiPicker(props) {
  const emojisPerPage = 16;
  const [emojis, setEmojis] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(false);

  // TODO fix the back and next page buttons :(
  const backPage = (e) => {
    e.preventDefault(); // prevent refreshing of page

    if (currentPage === 0) {
      setDisableBackButton(true);
    } else {
      setCurrentPage(currentPage - emojisPerPage);
      setDisableNextButton(false);
    }
  };

  const nextPage = (e) => {
    e.preventDefault(); // prevent refreshing of page

    if (currentPage + emojisPerPage > Object.keys(FoodEmoji).length) {
      setDisableNextButton(true);
    }
    setCurrentPage(currentPage + emojisPerPage);
    setDisableBackButton(false);
  };

  useEffect(() => {
    const emojiObject = {};
    let page = 0;

    let color = "#fff";
    let darkerColor = adjustBrightness(color, -50);

    Object.keys(FoodEmoji).forEach(function (key, index) {
      if (index % emojisPerPage === 0) {
        emojiObject[index] = [];
        page = index;
      }
      emojiObject[page].push(
        <div
          className="emoji-item"
          onClick={() => {
            props.setEmoji(FoodEmoji[key]);
          }}
          key={FoodEmoji[key]}
        >
          <Emoji
            type={"food"}
            name={FoodEmoji[key]}
            width={30}
            height={30}
            style={{
              border: `2px solid ${darkerColor}`,
              backgroundColor: `${color}`,
              padding: "5px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      );
    });

    setEmojis(emojiObject);
  }, [props]);

  return (
    <div className="emoji-picker-container">
      <button
        id="close-emoji-picker"
        onClick={(e) => props.setOpenEmojiPicker(false)}
      >
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.MULTIPLY}
          width={20}
          height={20}
        />
      </button>
      <div className="emoji-list">{emojis[currentPage]}</div>
      <button onClick={(e) => backPage(e)} disabled={disableBackButton}>
        <span>Back</span>
      </button>
      <button onClick={(e) => nextPage(e)} disabled={disableNextButton}>
        <span>Next</span>
      </button>
    </div>
  );
}

export default EmojiPicker;
