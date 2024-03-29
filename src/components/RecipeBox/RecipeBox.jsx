import "./RecipeBox.scss";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RecipeForm from "../RecipeForm/RecipeForm";
import RecipeBoxForm from "../RecipeBoxForm/RecipeBoxForm";
import Emoji from "../Emoji/Emoji";
import { adjustBrightness } from "../../helpers/colorHelpers";
import ActionsBar from "../ActionsBar/ActionsBar";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { removeRecipeBox } from "../../api/recipeBox";

function RecipeBox(props) {
  const [addingRecipeToBox, setAddingRecipeToBox] = useState(false);
  const [editingRecipeBox, setEditingRecipeBox] = useState(false);
  const darkerColor = adjustBrightness(props.box.color, -80);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const pageLink =
    "/profile/" +
    location.pathname.split("/")[2] +
    "/recipe-boxes/" +
    props.box.recipe_box_id;

  const deleteRecipeBox = async () => {
    // TODO create box that alerts users that all recipes are going to be deleted as well
    try {
      await removeRecipeBox(props.box.recipe_box_id);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  // TODO add tool tip
  return (
    <div className="recipe-box">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <Emoji
        type={"food"}
        name={props.box.emoji}
        width={30}
        height={30}
        style={{
          backgroundColor: props.box.color,
          border: `2px solid ${darkerColor}`,
        }}
      />
      <ActionsBar
        source={"RecipeBox"}
        setAdd={setAddingRecipeToBox}
        setEditing={setEditingRecipeBox}
        delete={deleteRecipeBox}
      />
      <h4 className="recipe-box-name">
        <Link to={pageLink}>{props.box.name}</Link>
      </h4>
      <h4>{props.box.description}</h4>
      <h3># Recipes: {props.recipes.length}</h3>
      {addingRecipeToBox && (
        <RecipeForm
          action={"create"}
          recipeBox={props.box}
          setAddingRecipeToBox={setAddingRecipeToBox}
        />
      )}
      {editingRecipeBox && (
        <RecipeBoxForm
          action={"edit"}
          box={props.box}
          setEditingRecipeBox={setEditingRecipeBox}
        />
      )}
    </div>
  );
}

export default RecipeBox;
