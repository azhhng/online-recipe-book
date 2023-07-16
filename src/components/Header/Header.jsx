import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import AuthorizationButton from "../AuthorizationButton/AuthorizationButton";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";
import { userStore } from "../../stores/user";

function Header() {
  const location = useLocation();
  const isOnProfile =
    location.pathname.split("/")[1] === "profile" ? true : false;
  const userSub = userStore((state) => state.sub);
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
      {!userSub && <AuthorizationButton action={"signup"} />}
      {!userSub && <AuthorizationButton action={"login"} />}
      {userSub && <Link to={"/profile/" + userSub}>Profile</Link>}
      {userSub && <AuthorizationButton action={"logout"} />}
    </div>
  );
}

export default Header;
