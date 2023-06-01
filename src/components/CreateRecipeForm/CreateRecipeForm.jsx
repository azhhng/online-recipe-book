import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./CreateRecipeForm.scss";

function CreateRecipeForm(props) {
  const { user } = useAuth0();
  const [recipeBoxId, setRecipeBoxId] = useState(
    props?.recipeBox?.recipe_box_id ?? ""
  );
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [hasMade, setHasMade] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [boxOptions, setBoxOptions] = useState([]);

  const createRecipe = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/${user?.sub}/recipe`,
      {
        name,
        link,
        description,
        has_made: hasMade,
        favorite,
        recipe_box_id: recipeBoxId,
      }
    );
    console.log("Creating a recipe...");
    console.log(response);
  };

  useEffect(() => {
    const getRecipeBoxes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user?.sub}/recipe-box`
        )
      ).data;

      const options = response.map((recipeBox) => {
        return (
          <option key={recipeBox.recipe_box_id} value={recipeBox.recipe_box_id}>
            {recipeBox.name}
          </option>
        );
      });
      setBoxOptions(options);
    };
    getRecipeBoxes();
  }, [user]);

  return (
    <div className="recipe-form-container">
      <div>
        <form className="recipe-form">
          <input
            type="text"
            id="recipe-name"
            name="name/"
            value={name}
            placeholder="Name..."
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            type="text"
            id="recipe-link"
            name="link/"
            value={link}
            placeholder="Link..."
            onChange={(event) => setLink(event.target.value)}
          ></input>
          <input
            type="text"
            id="recipe-description"
            name="description/"
            value={description}
            placeholder="Description..."
            onChange={(event) => setDescription(event.target.value)}
          ></input>
          {props?.sourcePage === "RecipePage" && (
            <select
              name="recipeBox"
              id="recipeBox"
              onChange={(event) => setRecipeBoxId(event.target.value)}
            >
              {boxOptions}
            </select>
          )}
          <input
            type="checkbox"
            id="recipe-has-made"
            name="has-made/"
            checked={hasMade}
            onChange={(event) => setHasMade(!hasMade)}
          ></input>
          <label htmlFor="recipe-has-made">Has Made</label>
          <input
            type="checkbox"
            id="recipe-favorite"
            name="favorite/"
            checked={favorite}
            onChange={(event) => setFavorite(!favorite)}
          ></input>
          <label htmlFor="recipe-favorite">Favorite</label>
        </form>
      </div>
      <button onClick={() => createRecipe()}>
        <span>Add Recipe</span>
      </button>
    </div>
  );
}

export default CreateRecipeForm;
