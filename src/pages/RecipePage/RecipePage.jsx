import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipePage.scss";
import Recipe from "../../components/Recipe/Recipe";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

function RecipePage() {
  const { user } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [recipeBoxes, setRecipeBoxes] = useState({});

  useEffect(() => {
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe-box`
        )
      ).data;

      const recipeBoxObject = {};
      response.map(
        (recipeBox) => (recipeBoxObject[recipeBox.recipe_box_id] = recipeBox)
      );
      setRecipeBoxes(recipeBoxObject);
    };
    getRecipeBoxes();
  }, [user]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe`
        )
      ).data;
      setRecipes(response);
    };
    getRecipes();
  }, [user]);

  if (Object.keys(recipeBoxes).length === 0) {
    return <div className="recipe-page-container"></div>;
  }
  return (
    <div className="recipe-page-container">
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
