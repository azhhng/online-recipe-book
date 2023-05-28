import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import "./CreateRecipeBoxForm.scss";

function CreateRecipeBoxForm() {
  const { user } = useAuth0();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createRecipeBox = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe-box`,
      {
        name,
        description,
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
            name="name/"
            value={name}
            placeholder="Name..."
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            type="text"
            id="recipe-box-description"
            name="description/"
            value={description}
            placeholder="Description..."
            onChange={(event) => setDescription(event.target.value)}
          ></input>
        </form>
      </div>
      <button onClick={() => createRecipeBox()}>
        <span>Create Recipe Box</span>
      </button>
    </div>
  );
}

export default CreateRecipeBoxForm;
