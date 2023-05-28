import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeBox from "../../components/RecipeBox/RecipeBox";

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
      console.log(response);
    };
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`
        )
      ).data;
      console.log(response);
      setRecipeBoxes(response);
    };
    getRecipes();
    getRecipeBoxes();
  }, []);

  // useEffect(() => {
  //   const postRecipeBox = async () => {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`,
  //       {
  //         name: "Want To Make",
  //         description: "A box of recipes I wish to make in the future!",
  //       }
  //     );
  //     console.log("Creating a recipe box...");
  //     console.log(response);
  //   };
  //   postRecipeBox();
  // }, []);

  return (
    <div className="profile-page-container">
      {recipeBoxes.map((recipeBox) => (
        <RecipeBox key={recipeBox.recipe_box_id} box={recipeBox} />
      ))}
    </div>
  );
}

export default ProfilePage;
