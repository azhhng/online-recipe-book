import React from "react";
import "./WelcomePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="guide-container">
        <h3>Get started with 3 simple steps:</h3>
      </div>
    </div>
  );
}

export default WelcomePage;
