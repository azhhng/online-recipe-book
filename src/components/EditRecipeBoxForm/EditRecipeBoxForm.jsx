import React, { useState } from "react";
import axios from "axios";
import "./EditRecipeBoxForm.scss";

function EditRecipeBoxForm(props) {
  const [name, setName] = useState(props.box.name);
  const [description, setDescription] = useState(props.box.description);
  const [color, setColor] = useState(props.box.color);
  const fieldsToUpdate = {};

  const updateRecipeBox = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_ADDRESS}/recipe-box/${props.box.recipe_box_id}`,
      {
        description: description,
        name: name,
        color: color,
      }
    );
    props.setEditingRecipeBox(false);
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
            value={name}
            placeholder="Name..."
            onChange={(event) => {
              fieldsToUpdate["name"] = event.target.value;
              setName(event.target.value);
            }}
          ></input>
          <textarea
            type="text"
            id="recipe-box-description"
            value={description}
            placeholder="Description..."
            onChange={(event) => {
              fieldsToUpdate["description"] = event.target.value;
              setDescription(event.target.value);
            }}
          ></textarea>
          <input
            type="color"
            id="favcolor"
            value={color}
            onChange={(event) => setColor(event.target.value)}
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
