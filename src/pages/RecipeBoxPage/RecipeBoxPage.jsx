import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecipeBoxPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import RecipeBox from "../../components/RecipeBox/RecipeBox";
import RecipeBoxForm from "../../components/RecipeBoxForm/RecipeBoxForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";

function RecipeBoxPage() {
  const { user } = useAuth0();
  console.log(user);
  const [recipeBoxes, setRecipeBoxes] = useState([]);
  const [recipesPerBox, setRecipesPerBox] = useState({});

  useEffect(() => {
    const getRecipes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe`
        )
      ).data;

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
    };
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe-box`
        )
      ).data;
      setRecipeBoxes(response);
    };
    getRecipes();
    getRecipeBoxes();
  }, [user]);

  return (
    <div className="profile-page-container">
      <PageTitleBar
        title="Your recipe boxes..."
        emojiType={"food"}
        emoji={FoodEmoji.TAKEOUT_BOX}
        color="#8fa2e3"
      />
      {recipeBoxes.map((recipeBox) => (
        <RecipeBox
          key={recipeBox.recipe_box_id}
          box={recipeBox}
          recipes={recipesPerBox[recipeBox.recipe_box_id] ?? []}
        />
      ))}
      <RecipeBoxForm action={"create"} />
    </div>
  );
}

export default RecipeBoxPage;
