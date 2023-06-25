import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipePage.scss";
import Recipe from "../../components/Recipe/Recipe";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { SymbolEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { splitUserSub } from "../../helpers/stringHelpers";

function RecipePage() {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const [recipes, setRecipes] = useState([]);
  const [recipeBoxes, setRecipeBoxes] = useState({});
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getRecipeBoxes = async () => {
      try {
        const response = (
          await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe-box`
          )
        ).data;
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
        const response = (
          await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}/user/${userSub}/recipe`
          )
        ).data;
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
          emoji={SymbolEmoji.LOVE_LETTER}
          color="#8fa2e3"
          description="Add some recipes to get started!"
        />
        <RecipeForm action={"create"} />
      </div>
    );
  }
  return (
    <div className="recipe-page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <PageTitleBar
        title="Your recipes..."
        emojiType={"symbols"}
        emoji={SymbolEmoji.LOVE_LETTER}
        color="#8fa2e3"
      />
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
        />
      ))}
      <RecipeForm action={"create"} />
    </div>
  );
}

export default RecipePage;
