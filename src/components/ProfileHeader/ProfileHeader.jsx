import React from "react";
import { Link } from "react-router-dom";
import "./ProfileHeader.scss";
import { useAuth0 } from "@auth0/auth0-react";

function ProfileHeader() {
  const { user } = useAuth0();
  // TODO fix bug where refreshing page gives undefined sub error

  return (
    <div className="profile-header">
      <Link to={"/"}>Recipe Boxes</Link>
      <Link to={"/profile/" + user.sub.split("|")[1] + "/recipes"}>
        Recipes
      </Link>
    </div>
  );
}

export default ProfileHeader;
