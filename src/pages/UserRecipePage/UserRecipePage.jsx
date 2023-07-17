import React, { useState, useEffect } from "react";
import "./UserRecipePage.scss";
import Recipe from "../../components/Recipe/Recipe";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { SymbolEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { getAllUserRecipeBoxes } from "../../api/recipeBox";
import { getAllUserRecipes } from "../../api/recipe";
import { userStore } from "../../stores/user";

function UserRecipePage() {
  const userSub = userStore((state) => state.sub);
  const [recipes, setRecipes] = useState([]);
  const [recipeBoxes, setRecipeBoxes] = useState({});
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getRecipeBoxes = async () => {
      try {
        const response = await getAllUserRecipeBoxes(userSub);
        if (response.length === 0) {
          setShowError(true);
          setErrorMessage(
            "Make a recipe box first before creating your first recipe!"
          );
        }

        const recipeBoxObject = {};
        response.map(
          (recipeBox) => (recipeBoxObject[recipeBox.recipe_box_id] = recipeBox)
        );
        setRecipeBoxes(recipeBoxObject);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    if (userSub) {
      getRecipeBoxes();
    }
  }, [userSub]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await getAllUserRecipes(userSub);
        setRecipes(response);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    if (userSub) {
      getRecipes();
    }
  }, [userSub]);

  if (Object.keys(recipeBoxes).length === 0) {
    return (
      <div className="recipe-page-container">
        {showError && (
          <ErrorPopup message={errorMessage} setShowError={setShowError} />
        )}
        <PageTitleBar
          title="Your recipes..."
          emojiType={"symbols"}
          emoji={SymbolEmoji.SCROLL}
          color="#8fa2e3"
        />
        <div className="recipe-group-container">
          <RecipeForm action={"create"} />
        </div>
      </div>
    );
  }
  return (
    <div className="page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <PageTitleBar
        title="Your recipes..."
        emojiType={"symbols"}
        emoji={SymbolEmoji.SCROLL}
        color="#8fa2e3"
      />
      <div className="recipe-action-bar">
        <button id="action-button" onClick={() => setAddingRecipeToBox(true)}>
          Add recipe
        </button>
      </div>
      <div className="recipe-group-container">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe_id}
            recipeId={recipe.recipe_id}
            box={recipeBoxes[recipe.recipe_box_id]}
            name={recipe.name}
            link={recipe.link}
            description={recipe.description ?? ""}
            hasMade={recipe.has_made}
            favorite={recipe.favorite}
            sameUser={true}
          />
        ))}
        {addingRecipeToBox && (
          <RecipeForm
            action={"create"}
            setAddingRecipeToBox={setAddingRecipeToBox}
          />
        )}
      </div>
    </div>
  );
}

export default UserRecipePage;
