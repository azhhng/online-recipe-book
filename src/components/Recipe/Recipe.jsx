import "./Recipe.scss";
import React, { useEffect, useState } from "react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
import { adjustBrightness } from "../../helpers/colorHelpers";

function Recipe(props) {
  const [darkerColor, setDarkerColor] = useState("#fff");

  useEffect(() => {
    setDarkerColor(adjustBrightness(props.box.color, -80));
  }, [props]);

  return (
    <div className="recipe-container">
      <h3 className="recipe-name-container">{props.name}</h3>
      <h4>{props.description}</h4>
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
    </div>
  );
}

export default Recipe;
