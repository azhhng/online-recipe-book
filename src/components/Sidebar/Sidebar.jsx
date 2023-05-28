import React from "react";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <h1>
        <span>Recipe</span>boxd
      </h1>
      <h2>Your collection of online recipes...</h2>
      <h2>The modern recipe box!</h2>
      {/* <h2>
        Made by <a href="https://azhhng.netlify.app">Alice Zhang</a>.
      </h2>
      <h2>
        You can find the Github{" "}
        <a href="https://github.com/azhhng/spaceify">here</a>.
      </h2> */}
    </div>
  );
}

export default Sidebar;
