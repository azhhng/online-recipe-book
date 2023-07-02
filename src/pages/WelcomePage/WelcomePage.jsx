import React from "react";
import "./WelcomePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Emoji from "../../components/Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";
import EmojiBubble from "../../components/EmojiBubble/EmojiBubble";
import { adjustBrightness } from "../../helpers/colorHelpers";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <EmojiBubble
        emoji={FoodEmoji.PANCAKES}
        style={{
          backgroundColor: "#ffebb5",
          border: `3px solid ${adjustBrightness("#ffebb5", -40)}`,
          bottom: "40px",
          left: "430px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.AVOCADO}
        style={{
          backgroundColor: "#c5edc9",
          border: `3px solid ${adjustBrightness("#c5edc9", -40)}`,
          bottom: "120px",
          left: "60px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.PEACH}
        style={{
          backgroundColor: "#ffdfd1",
          border: `3px solid ${adjustBrightness("#ffdfd1", -40)}`,
          bottom: "820px",
          left: "830px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.SUSHI}
        style={{
          backgroundColor: "#ffdfd1",
          border: `3px solid ${adjustBrightness("#ffdfd1", -40)}`,
          bottom: "400px",
          left: "490px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.PIE}
        style={{
          backgroundColor: "#ffe3bd",
          border: `3px solid ${adjustBrightness("#ffe3bd", -40)}`,
          bottom: "300px",
          left: "1230px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.COCONUT}
        style={{
          backgroundColor: "#e6d7c3",
          border: `3px solid ${adjustBrightness("#e6d7c3", -40)}`,
          bottom: "220px",
          left: "1030px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.BLUEBERRIES}
        style={{
          backgroundColor: "#e6e7ff",
          border: `3px solid ${adjustBrightness("#e6e7ff", -40)}`,
          bottom: "600px",
          left: "1480px",
        }}
      />
      <EmojiBubble
        emoji={FoodEmoji.COCKTAIL_GLASS}
        style={{
          backgroundColor: "#ebf5ff",
          border: `3px solid ${adjustBrightness("#ebf5ff", -40)}`,
          bottom: "770px",
          left: "230px",
        }}
      />
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="guide-container">
        <h1>Get started in 3 simple steps:</h1>
        <ul>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.PANCAKES}
              width={35}
              height={35}
            />
            Sign up with your Google or Github account
          </li>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.PANCAKES}
              width={35}
              height={35}
            />
            Create your first recipe box
          </li>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.PANCAKES}
              width={35}
              height={35}
            />
            Start adding your recipe links
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomePage;
