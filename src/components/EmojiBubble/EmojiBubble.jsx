import React from "react";
import "./EmojiBubble.scss";
import Emoji from "../Emoji/Emoji";

function EmojiBubble(props) {
  return (
    <div
      className="emoji-bubble"
      style={props.style ?? {}}
      onClick={() => {
        if (props.navigateToPage) {
          props.navigateToPage();
        }
      }}
    >
      <Emoji
        type={"food"}
        name={props.emoji}
        width={props.emojiSize ?? 40}
        height={props.emojiSize ?? 40}
      />
    </div>
  );
}

export default EmojiBubble;
