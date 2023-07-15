import React, { useState, useEffect } from "react";
import "./WelcomePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Emoji from "../../components/Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";
import { getAllUserRecipeBoxes } from "../../api/recipeBox";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import EmojiBubble from "../../components/EmojiBubble/EmojiBubble";
import { adjustBrightness } from "../../helpers/colorHelpers";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  const [recipeBoxes, setRecipeBoxes] = useState([]);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getRecipeBoxes = async () => {
      try {
        const response = await getAllUserRecipeBoxes(1);
        const boxes = response.map((recipeBox) => {
          const navigateToPage = () => {
            navigate(`/profile/1/recipe-boxes/${recipeBox.recipe_box_id}`);
          };
          return (
            <EmojiBubble
              key={recipeBox.recipe_box_id}
              emoji={recipeBox.emoji}
              style={{
                backgroundColor: recipeBox.color,
                border: `3px solid ${adjustBrightness(recipeBox.color, -40)}`,
                width: "63px",
                height: "60px",
              }}
              navigateToPage={navigateToPage}
            />
          );
        });
        setRecipeBoxes(boxes);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getRecipeBoxes();
  }, [navigate]);

  return (
    <div className="welcome-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
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
      <div className="guide-container">
        <h1>Take a look at some recipe boxes for inspiration:</h1>
        <ul>{recipeBoxes}</ul>
      </div>
    </div>
  );
}

export default WelcomePage;
