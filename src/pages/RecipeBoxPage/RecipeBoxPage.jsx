import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { getRecipeBoxRecipes } from "../../api/recipeBox";
import { retrieveRecipeBox } from "../../api/recipeBox";
import { useLocation } from "react-router-dom";
import Recipe from "../../components/Recipe/Recipe";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import { splitUserSub } from "../../helpers/stringHelpers";

function RecipeBoxPage() {
  const location = useLocation();
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const [sameUser, setSameUser] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeBox, setRecipeBox] = useState({});
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
        {sameUser && <RecipeForm action={"create"} />}
      </div>
    </div>
  );
}

export default RecipeBoxPage;
