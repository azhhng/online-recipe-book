import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeBox from "../../components/RecipeBox/RecipeBox";
import CreateRecipeBoxForm from "../../components/CreateRecipeBoxForm/CreateRecipeBoxForm";

function ProfilePage() {
  const { user } = useAuth0();
  const [recipeBoxes, setRecipeBoxes] = useState([]);
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
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`
        )
      ).data;
      setRecipeBoxes(response);
    };
    getRecipes();
    getRecipeBoxes();
  }, [user]);

  return (
    <div className="profile-page-container">
      {recipeBoxes.map((recipeBox) => (
        <RecipeBox key={recipeBox.recipe_box_id} box={recipeBox} />
      ))}
      <CreateRecipeBoxForm />
    </div>
  );
}

export default ProfilePage;
