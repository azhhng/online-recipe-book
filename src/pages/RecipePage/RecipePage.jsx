import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipePage.scss";
import Recipe from "../../components/Recipe/Recipe";
import { useAuth0 } from "@auth0/auth0-react";
import CreateRecipeForm from "../../components/CreateRecipeForm/CreateRecipeForm";

function RecipePage() {
  const { user } = useAuth0();
  const [recipes, setRecipes] = useState([]);
  const [recipeBoxes, setRecipeBoxes] = useState({});

  useEffect(() => {
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user?.sub}/recipe-box`
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
          `${process.env.REACT_APP_API_ADDRESS}/${user?.sub}/recipe`
        )
      ).data;
      setRecipes(response);
    };
    getRecipes();
  }, [user]);

  if (Object.keys(recipeBoxes).length === 0) {
    // TODO make this look nicer
    return <div className="recipe-page-container">loading...</div>;
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
      <CreateRecipeForm sourcePage={"RecipePage"} />
    </div>
  );
}

export default RecipePage;
