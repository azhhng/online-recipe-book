import React, { useEffect, useState } from "react";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { getRecipeBoxRecipes } from "../../api/recipeBox";
import { retrieveRecipeBox } from "../../api/recipeBox";
import { useLocation } from "react-router-dom";
import Recipe from "../../components/Recipe/Recipe";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import { userStore } from "../../stores/user";

function RecipeBoxPage() {
  const location = useLocation();
  const userSub = userStore((state) => state.sub);
  const [sameUser, setSameUser] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeBox, setRecipeBox] = useState({});
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recipeBoxId = location.pathname.split("/")[4];

  useEffect(() => {
    const getRecipeBox = async () => {
      try {
        const response = await retrieveRecipeBox(recipeBoxId);
        setRecipeBox(response.data[0]);
        if (response.data[0].user_id === userSub) {
          setSameUser(true);
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getRecipeBox();
  }, [recipeBoxId, userSub]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await getRecipeBoxRecipes(recipeBoxId);
        setRecipes(response);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getRecipes();
  }, [recipeBoxId]);

  return (
    <div>
      <PageTitleBar
        title={"Recipe box | " + (recipeBox?.name ?? "")}
        emojiType={"food"}
        emoji={recipeBox?.emoji ?? FoodEmoji.BANANA}
        color="#8fa2e3"
      />
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      {sameUser && (
        <div className="recipe-action-bar">
          <button id="action-button" onClick={() => setAddingRecipeToBox(true)}>
            Add recipe
          </button>
        </div>
      )}
      <div className="recipe-group-container">
        {Object.keys(recipeBox).length !== 0 &&
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe_id}
              recipeId={recipe.recipe_id}
              box={recipeBox}
              name={recipe.name}
              link={recipe.link}
              description={recipe.description ?? ""}
              hasMade={recipe.has_made}
              favorite={recipe.favorite}
              sameUser={sameUser}
            />
          ))}
        {sameUser && addingRecipeToBox && (
          <RecipeForm
            action={"create"}
            setAddingRecipeToBox={setAddingRecipeToBox}
          />
        )}
      </div>
    </div>
  );
}

export default RecipeBoxPage;
