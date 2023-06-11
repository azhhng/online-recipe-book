import React from "react";
import "./ActionsBar.scss";
import { SymbolEmoji } from "../../enums/Emojis";
import Emoji from "../Emoji/Emoji";

function ActionsBar(props) {
  return (
    <div className="actions-box">
      {props.source === "RecipeBox" && (
        <button onClick={() => props.setAdd(true)}>
          <Emoji
            type={"symbols"}
            name={SymbolEmoji.PLUS}
            width={30}
            height={30}
          />
        </button>
      )}
      <button onClick={() => props.setEditing(true)}>
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.PENCIL}
          width={30}
          height={30}
        />
      </button>
      <button onClick={() => props.delete()}>
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.SCISSORS}
          width={30}
          height={30}
        />
      </button>
    </div>
  );
}

export default ActionsBar;
