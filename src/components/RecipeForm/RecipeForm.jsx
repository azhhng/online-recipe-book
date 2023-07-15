import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./RecipeForm.scss";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { splitUserSub } from "../../helpers/stringHelpers";
import { addRecipe, editRecipe } from "../../api/recipe";
import { getAllUserRecipeBoxes } from "../../api/recipeBox";

function RecipeForm(props) {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const [name, setName] = useState(props?.name ?? "");
  const [description, setDescription] = useState(props?.description ?? "");
  const [link, setLink] = useState(props?.link ?? "");
  const [hasMade, setHasMade] = useState(props?.hasMade ?? false);
  const [favorite, setFavorite] = useState(props?.favorite ?? false);
  const [recipeBoxId, setRecipeBoxId] = useState(
    props?.box?.recipe_box_id ?? props?.recipeBox?.recipe_box_id ?? ""
  );
  const [boxOptions, setBoxOptions] = useState([]);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createRecipe = async () => {
    try {
      await addRecipe(userSub, {
        name,
        link,
        description,
        has_made: hasMade,
        favorite,
        recipe_box_id: recipeBoxId,
      });
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  const updateRecipe = async () => {
    try {
      await editRecipe(props.recipeId, {
        description,
        name,
        link,
        recipe_box_id: recipeBoxId,
        favorite,
        has_made: hasMade,
      });
      props.setEditingRecipe(false);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  useEffect(() => {
    // TODO have the actual recipe box set not just the first one
    const getRecipeBoxes = async () => {
      try {
        const recipeBoxes = await getAllUserRecipeBoxes(userSub);
        if (props.action === "create" && recipeBoxes.length !== 0) {
          setRecipeBoxId(recipeBoxes[0].recipe_box_id);
        }
        const options = recipeBoxes.map((recipeBox) => {
          return (
            <option
              key={recipeBox.recipe_box_id}
              value={recipeBox.recipe_box_id}
            >
              {recipeBox.name}
            </option>
          );
        });
        setBoxOptions(options);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getRecipeBoxes();
  }, [userSub, props.action]);

  return (
    <div
      className="recipe-form-container"
      style={
        props.action === "edit" ? { position: "absolute", zIndex: "2" } : {}
      }
    >
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
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
      {props.action === "edit" && (
        <button id="form-button" onClick={() => props.setEditingRecipe(false)}>
          Cancel
        </button>
      )}
      {props.action === "create" && (
        <button
          id="form-button"
          onClick={() => props.setAddingRecipeToBox(false)}
        >
          Cancel
        </button>
      )}
      {props.action === "edit" && (
        <button id="form-button" onClick={() => updateRecipe()}>
          Update
        </button>
      )}
      {props.action === "create" && (
        <button id="form-button" onClick={() => createRecipe()}>
          Add
        </button>
      )}
    </div>
  );
}

export default RecipeForm;
