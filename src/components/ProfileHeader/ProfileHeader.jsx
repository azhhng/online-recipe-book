import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ProfileHeader.scss";

function ProfileHeader() {
  const location = useLocation();
  const userSub = location.pathname.split("/")[2];

  return (
    <div className="profile-header">
      <Link to={"/profile/" + userSub}>Recipe Boxes</Link>
      <Link to={"/profile/" + userSub + "/recipes"}>Recipes</Link>
    </div>
  );
}

export default ProfileHeader;
