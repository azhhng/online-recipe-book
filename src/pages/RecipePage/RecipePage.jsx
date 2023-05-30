import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipePage.scss";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Recipe from "../../components/Recipe/Recipe";
import { useAuth0 } from "@auth0/auth0-react";

function RecipePage() {
  const { user } = useAuth0();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe`
        )
      ).data;
      setRecipes(response);
    };
    getRecipes();
  }, [user]);

  return (
    <div className="recipe-page-container">
      <ProfileHeader />
      {recipes.map((recipe) => (
        <Recipe
          key={recipe.recipe_id}
          box={recipe.recipe_box_id}
          name={recipe.name}
          link={recipe.link}
          description={recipe.description ?? ""}
          hasMade={recipe.has_made}
          favorite={recipe.favorite}
        />
      ))}
    </div>
  );
}

export default RecipePage;
