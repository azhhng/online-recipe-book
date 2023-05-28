import "./RecipeBox.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import CreateRecipeForm from "../CreateRecipeForm/CreateRecipeForm";

function RecipeBox(props) {
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
  }, []);

  return (
    <div className="recipe-box">
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      <CreateRecipeForm recipeBox={props.box} />
    </div>
  );
}

export default RecipeBox;
