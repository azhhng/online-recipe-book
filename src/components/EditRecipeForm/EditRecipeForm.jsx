import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./EditRecipeForm.scss";

function EditRecipeForm(props) {
  const { user } = useAuth0();
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [link, setLink] = useState(props.link);
  const [hasMade, setHasMade] = useState(props.hasMade);
  const [favorite, setFavorite] = useState(props.favorite);
  const [recipeBoxId, setRecipeBoxId] = useState(props.box.recipe_box_id);
  const [boxOptions, setBoxOptions] = useState([]);

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
          `${process.env.REACT_APP_API_ADDRESS}/${user?.sub}/recipe-box`
        )
      ).data;

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
  }, [user]);

  return (
    <div className="recipe-form-container">
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
            id="recipe-box-id"
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
        </form>
      </div>
      <button onClick={() => props.setEditingRecipe(false)}>
        <span>Cancel</span>
      </button>
      <button onClick={() => updateRecipe()}>
        <span>Update</span>
      </button>
    </div>
  );
}

export default EditRecipeForm;
