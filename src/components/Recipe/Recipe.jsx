import "./Recipe.scss";
import React from "react";

function Recipe(props) {
  console.log("in recipe component...");
  console.log(props);
  return (
    <div className="recipe-container">
      <h3 className="recipe-name-container">{props.name}</h3>
      <h3>{props.description}</h3>
    </div>
  );
}

export default Recipe;
