import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton";
import { useAuth0 } from "@auth0/auth0-react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";

function Header(props) {
  const location = useLocation();
  const isOnProfile =
    location.pathname.split("/")[1] === "profile" ? true : false;
  const { user } = useAuth0();

  return (
    <div className="header">
      {isOnProfile && (
        <Link
          to={"/profile/" + location.pathname.split("/")[2] + "/recipe-boxes"}
        >
          Recipe boxes
        </Link>
      )}
      {isOnProfile && (
        <Link to={"/profile/" + location.pathname.split("/")[2] + "/recipes"}>
          Recipes
        </Link>
      )}
      <Emoji type={"food"} name={FoodEmoji.BENTO} width={50} height={35} />
      <Link to={"/"}>Home</Link>
      <Link to={"/explore"}>Explore</Link>
      {!user && <AuthorizationButton action={"signup"} />}
      {!user && <AuthorizationButton action={"login"} />}
      {user && <Link to={"/profile/" + user.sub.split("|")[1]}>Profile</Link>}
      {user && <AuthorizationButton action={"logout"} />}
    </div>
  );
}

export default Header;
