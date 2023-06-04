import React from "react";
import "./Sidebar.scss";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="title-container">
        <Emoji type={"food"} name={FoodEmoji.BENTO} width={100} height={100} />
        <h1>
          <span>Recipe</span>boxd
        </h1>
      </div>

      <h2>Your collection of online recipes...</h2>
      <h2>The modern recipe box!</h2>
    </div>
  );
}

export default Sidebar;
