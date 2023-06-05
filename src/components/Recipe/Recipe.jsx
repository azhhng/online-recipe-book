import "./Recipe.scss";
import React from "react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";

function Recipe(props) {
  return (
    <div className="recipe-container">
      <h3 className="recipe-name-container">{props.name}</h3>
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.LINK}
          width={50}
          height={35}
        />
      </a>
      <h3>{props.description}</h3>
      {props.favorite && (
        <Emoji
          type={"symbols"}
          name={SymbolEmoji.SPARKLING_HEART}
          width={50}
          height={35}
        />
      )}
      {props.hasMade && (
        <Emoji
          type={"food"}
          name={FoodEmoji.FORK_KNIFE_PLATE}
          width={50}
          height={35}
        />
      )}
    </div>
  );
}

export default Recipe;
