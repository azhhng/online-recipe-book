import React from "react";
import "./Sidebar.scss";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";
import EmojiBubble from "../../components/EmojiBubble/EmojiBubble";
import { adjustBrightness } from "../../helpers/colorHelpers";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="title-container">
        <Emoji type={"food"} name={FoodEmoji.BENTO} width={100} height={100} />
        <h1>
          <span>Recipe</span>boxd
        </h1>
        <EmojiBubble
          emoji={FoodEmoji.LEAFY_GREEN}
          style={{
            backgroundColor: "#d8f0df",
            position: "absolute",
            border: `3px solid ${adjustBrightness("#d8f0df", -40)}`,
            bottom: "140px",
            left: "100px",
            width: "60px",
            height: "60px",
          }}
        />
        <EmojiBubble
          emoji={FoodEmoji.GREEN_SALAD}
          style={{
            backgroundColor: "#d4fadf",
            position: "absolute",
            border: `3px solid ${adjustBrightness("#d4fadf", -40)}`,
            bottom: "130px",
            left: "150px",
            width: "45px",
            height: "45px",
          }}
          emojiSize={28}
        />
        <EmojiBubble
          emoji={FoodEmoji.GRAPES}
          style={{
            backgroundColor: "#f5e6ff",
            position: "absolute",
            border: `3px solid ${adjustBrightness("#f5e6ff", -40)}`,
            bottom: "110px",
            left: "400px",
            width: "55px",
            height: "55px",
          }}
          emojiSize={35}
        />
        <EmojiBubble
          emoji={FoodEmoji.SPAGHETTI}
          style={{
            backgroundColor: "#ffe2e0",
            position: "absolute",
            border: `3px solid ${adjustBrightness("#ffe2e0", -40)}`,
            bottom: "10px",
            left: "580px",
            width: "60px",
            height: "60px",
          }}
          emojiSize={40}
        />
        <EmojiBubble
          emoji={FoodEmoji.TOMATO}
          style={{
            backgroundColor: "#ffe2e0",
            position: "absolute",
            border: `3px solid ${adjustBrightness("#ffe2e0", -40)}`,
            bottom: "0px",
            left: "540px",
            width: "45px",
            height: "45px",
          }}
          emojiSize={28}
        />
      </div>
      <h2>Your collection of online recipes... The modern recipe box!</h2>
    </div>
  );
}

export default Sidebar;
