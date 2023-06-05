import React from "react";
import "./EmojiBubble.scss";
import Emoji from "../Emoji/Emoji";

function EmojiBubble(props) {
  return (
    <div className="emoji-bubble" style={props.style ?? {}}>
      <Emoji type={"food"} name={props.emoji} width={40} height={40} />
    </div>
  );
}

export default EmojiBubble;
