import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecipeBoxPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeBox from "../../components/RecipeBox/RecipeBox";
import RecipeBoxForm from "../../components/RecipeBoxForm/RecipeBoxForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { splitUserSub } from "../../helpers/stringHelpers";

function RecipeBoxPage() {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const [recipeBoxes, setRecipeBoxes] = useState([]);
  const [recipesPerBox, setRecipesPerBox] = useState({});
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = (
          await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe`
          )
        ).data;

        const recipesPerBoxObject = {};
        for (const recipe in response) {
          if (
            recipesPerBoxObject.hasOwnProperty(response[recipe].recipe_box_id)
          ) {
            recipesPerBoxObject[response[recipe].recipe_box_id].push(
              response[recipe]
            );
          } else {
            recipesPerBoxObject[response[recipe].recipe_box_id] = [
              response[recipe],
            ];
          }
        }
        setRecipesPerBox(recipesPerBoxObject);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    const getRecipeBoxes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe-box`
        );
        setRecipeBoxes(response.data);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    if (userSub) {
      getRecipes();
      getRecipeBoxes();
    }
  }, [userSub]);

  return (
    <div className="profile-page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <PageTitleBar
        title="Your recipe boxes..."
        emojiType={"food"}
        emoji={FoodEmoji.TAKEOUT_BOX}
        color="#8fa2e3"
      />
      <div className="recipe-box-group-container">
        {recipeBoxes.map((recipeBox) => (
          <RecipeBox
            key={recipeBox.recipe_box_id}
            box={recipeBox}
            recipes={recipesPerBox[recipeBox.recipe_box_id] ?? []}
          />
        ))}
        <RecipeBoxForm action={"create"} />
      </div>
    </div>
  );
}

export default RecipeBoxPage;
