import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./RecipeForm.scss";

function RecipeForm(props) {
  const { user } = useAuth0();
  const [name, setName] = useState(props?.name ?? "");
  const [description, setDescription] = useState(props?.description ?? "");
  const [link, setLink] = useState(props?.link ?? "");
  const [hasMade, setHasMade] = useState(props?.hasMade ?? false);
  const [favorite, setFavorite] = useState(props?.favorite ?? false);
  const [recipeBoxId, setRecipeBoxId] = useState(
    props?.box?.recipe_box_id ?? props?.recipeBox?.recipe_box_id ?? ""
  );
  const [boxOptions, setBoxOptions] = useState([]);

  const createRecipe = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe`,
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
    window.location.reload();
  };

  const updateRecipe = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_ADDRESS}/recipe/${props.recipeId}`,
      {
        description,
        name,
        link,
        recipe_box_id: recipeBoxId,
        favorite,
        has_made: hasMade,
      }
    );
    props.setEditingRecipe(false);
    console.log("Updating a recipe...");
    console.log(response);
    window.location.reload();
  };

  useEffect(() => {
    // TODO have the actual recipe box set not just the first one
    const getRecipeBoxes = async () => {
      const recipeBoxes = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}/recipe-box`
        )
      ).data;
      if (props.action === "create" && recipeBoxes.length !== 0) {
        setRecipeBoxId(recipeBoxes[0].recipe_box_id);
      }
      const options = recipeBoxes.map((recipeBox) => {
        return (
          <option key={recipeBox.recipe_box_id} value={recipeBox.recipe_box_id}>
            {recipeBox.name}
          </option>
        );
      });
      setBoxOptions(options);
    };
    getRecipeBoxes();
  }, [user, props.action]);

  return (
    <div
      className="recipe-form-container"
      style={
        props.action === "edit" ? { position: "absolute", zIndex: "2" } : {}
      }
    >
      <div>
        <form className="recipe-form">
          <input
            type="text"
            id="recipe-name"
            value={name}
            placeholder="Name..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <input
            type="text"
            id="recipe-link"
            value={link}
            placeholder="Link..."
            onChange={(event) => {
              setLink(event.target.value);
            }}
          ></input>
          <textarea
            type="text"
            id="recipe-description"
            value={description}
            placeholder="Description..."
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <select
            id="recipe-id"
            onChange={(event) => setRecipeBoxId(event.target.value)}
          >
            {boxOptions}
          </select>
          <input
            type="checkbox"
            id="recipe-has-made"
            checked={hasMade}
            onChange={(event) => setHasMade(!hasMade)}
          ></input>
          <label htmlFor="recipe-has-made">Has Made</label>
          <input
            type="checkbox"
            id="recipe-favorite"
            checked={favorite}
            onChange={(event) => setFavorite(!favorite)}
          ></input>
          <label htmlFor="recipe-favorite">Favorite</label>
        </form>
      </div>
      {props.action === "edit" && (
        <button onClick={() => props.setEditingRecipe(false)}>
          <span>Cancel</span>
        </button>
      )}
      {props.action === "edit" && (
        <button onClick={() => updateRecipe()}>
          <span>Update</span>
        </button>
      )}
      {props.action === "create" && (
        <button onClick={() => createRecipe()}>
          <span>Add</span>
        </button>
      )}
    </div>
  );
}

export default RecipeForm;
