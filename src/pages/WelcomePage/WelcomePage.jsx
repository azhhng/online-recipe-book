import React from "react";
import "./WelcomePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Emoji from "../../components/Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="guide-container">
        <h1>Get started in 3 simple steps:</h1>
        <ul>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.TANGERINE}
              width={35}
              height={35}
            />
            Sign up with your Google or Github account
          </li>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.TANGERINE}
              width={35}
              height={35}
            />
            Create your first recipe box
          </li>
          <li>
            <Emoji
              type={"food"}
              name={FoodEmoji.TANGERINE}
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
