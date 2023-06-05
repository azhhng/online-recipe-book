import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./CreateRecipeBoxForm.scss";

function CreateRecipeBoxForm() {
  const { user } = useAuth0();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#8fafe3");

  const createRecipeBox = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`,
      {
        name,
        description,
        color,
      }
    );
    console.log("Creating a recipe box...");
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
            onChange={(event) => setName(event.target.value)}
          ></input>
          <textarea
            type="text"
            id="recipe-box-description"
            value={description}
            placeholder="Description..."
            rows="4"
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <input
            type="color"
            id="favcolor"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          ></input>
        </form>
      </div>
      <button onClick={() => createRecipeBox()}>
        <span>Create</span>
      </button>
    </div>
  );
}

export default CreateRecipeBoxForm;
