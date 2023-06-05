import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Emoji from "../Emoji/Emoji";
import { FoodEmoji } from "../../enums/Emojis";

function Header(props) {
  const location = useLocation();
  const isOnProfile =
    location.pathname.split("/")[1] === "profile" ? true : false;
  const { user } = useAuth0();
  console.log(isOnProfile);

  return (
    <div className="header">
      {isOnProfile && (
        <Link to={"/profile/" + location.pathname.split("/")[2]}>
          Recipe Boxes
        </Link>
      )}
      {isOnProfile && (
        <Link to={"/profile/" + location.pathname.split("/")[2] + "/recipes"}>
          Recipes
        </Link>
      )}
      <Emoji type={"food"} name={FoodEmoji.BENTO} width={50} height={35} />
      <Link to={"/"}>Home</Link>
      {!user && <LoginButton />}
      {user && <Link to={"/profile/" + user.sub.split("|")[1]}>Profile</Link>}
      {user && <LogoutButton />}
    </div>
  );
}

export default Header;
