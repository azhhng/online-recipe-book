import "./Recipe.scss";
import React from "react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";

function Recipe(props) {
  return (
    <div className="recipe-container">
      <h3 className="recipe-name-container">{props.name}</h3>
      <h3>{props.link}</h3>
      <h3>{props.description}</h3>
      {props.favorite && (
        <Emoji name={SymbolEmoji.SPARKLING_HEART} width={50} height={35} />
      )}
      {props.hasMade && (
        <Emoji name={FoodEmoji.FORK_KNIFE_PLATE} width={50} height={35} />
      )}
    </div>
  );
}

export default Recipe;
