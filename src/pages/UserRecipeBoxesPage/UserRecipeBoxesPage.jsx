import React, { useEffect, useState } from "react";
import "./UserRecipeBoxesPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeBox from "../../components/RecipeBox/RecipeBox";
import RecipeBoxForm from "../../components/RecipeBoxForm/RecipeBoxForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { SymbolEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { splitUserSub } from "../../helpers/stringHelpers";
import { getAllUserRecipeBoxes } from "../../api/recipeBox";
import { getAllUserRecipes } from "../../api/recipe";

function UserRecipeBoxesPage() {
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
        const response = await getAllUserRecipes(userSub);
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
        const response = await getAllUserRecipeBoxes(userSub);
        setRecipeBoxes(response);
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
        emojiType={"symbols"}
        emoji={SymbolEmoji.PACKAGE}
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

export default UserRecipeBoxesPage;
