import React, { useEffect, useState } from "react";
import "./EmojiPicker.scss";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
import { adjustBrightness } from "../../helpers/colorHelpers";

function EmojiPicker(props) {
  const EMOJIS_PER_PAGE = 16;
  const [emojis, setEmojis] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [disableBackButton, setDisableBackButton] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const backPage = (e) => {
    e.preventDefault(); // prevent refreshing of page
    const newPage = currentPage - EMOJIS_PER_PAGE;
    setCurrentPage(newPage);
    setDisableNextButton(false);
    if (newPage === 0) {
      setDisableBackButton(true);
    }
  };

  const nextPage = (e) => {
    e.preventDefault(); // prevent refreshing of page
    const newPage = currentPage + EMOJIS_PER_PAGE;
    setCurrentPage(newPage);
    setDisableBackButton(false);
    if (newPage + EMOJIS_PER_PAGE > Object.keys(FoodEmoji).length) {
      setDisableNextButton(true);
    }
  };

  useEffect(() => {
    const emojiObject = {};
    let page = 0;

    let color = "#fff";
    let darkerColor = adjustBrightness(color, -50);

    Object.keys(FoodEmoji).forEach(function (key, index) {
      if (index % EMOJIS_PER_PAGE === 0) {
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
      <div className="button-bar">
        <button onClick={(e) => backPage(e)} disabled={disableBackButton}>
          <Emoji
            type={"symbols"}
            name={
              disableBackButton
                ? SymbolEmoji.LEFT_ARROW_DISABLED
                : SymbolEmoji.LEFT_ARROW
            }
            width={30}
            height={30}
          />
        </button>
        <button onClick={(e) => nextPage(e)} disabled={disableNextButton}>
          <Emoji
            type={"symbols"}
            name={
              disableNextButton
                ? SymbolEmoji.RIGHT_ARROW_DISABLED
                : SymbolEmoji.RIGHT_ARROW
            }
            width={30}
            height={30}
          />
        </button>
      </div>
    </div>
  );
}

export default EmojiPicker;
