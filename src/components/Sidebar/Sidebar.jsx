import React from "react";
import "./Sidebar.scss";
import bentoBoxIcon from "../../assets/images/food/bento_box_3d.png";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="title-container">
        <img id="bento-icon" src={bentoBoxIcon} alt="ponyo" />
        <h1>
          <span>Recipe</span>boxd
        </h1>
      </div>

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
