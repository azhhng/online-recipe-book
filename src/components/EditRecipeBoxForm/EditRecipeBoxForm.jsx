import React, { useState } from "react";
import axios from "axios";
import "./EditRecipeBoxForm.scss";

function EditRecipeBoxForm(props) {
  const [name, setName] = useState(props.box.name);
  const [description, setDescription] = useState(props.box.description);
  const fieldsToUpdate = {};

  const updateRecipeBox = async () => {
    // TODO allow users to choose how they update their recipe box
    const response = await axios.put(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`,
      {
        description: description,
        name: name,
      }
    );
    console.log("Updating a recipe...");
    console.log(response);
  };

  return (
    <div className="recipe-box-form-container">
      <div>
        <form className="recipe-box-form">
          <input
            type="text"
            id="recipe-box-name"
            name="name/"
            value={name}
            placeholder="Name..."
            onChange={(event) => {
              fieldsToUpdate["name"] = event.target.value;
              setName(event.target.value);
            }}
          ></input>
          <input
            type="text"
            id="recipe-box-description"
            name="description/"
            value={description}
            placeholder="Description..."
            onChange={(event) => {
              fieldsToUpdate["description"] = event.target.value;
              setDescription(event.target.value);
            }}
          ></input>
        </form>
      </div>
      <button onClick={() => props.setEditingRecipeBox(false)}>
        <span>Cancel</span>
      </button>
      <button onClick={() => updateRecipeBox()}>
        <span>Update</span>
      </button>
    </div>
  );
}

export default EditRecipeBoxForm;
