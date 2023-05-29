import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import bentoBoxIcon from "../../assets/images/food/bento_box_3d.png";

function Header() {
  const { user } = useAuth0();

  return (
    <div className="header">
      <img id="bento-icon" src={bentoBoxIcon} alt="ponyo" />
      <Link to={"/"}>HOME</Link>
      {!user && <LoginButton />}
      {user && <Link to={"/profile/" + user.sub.split("|")[1]}>PROFILE</Link>}
      {user && <LogoutButton />}
    </div>
  );
}

export default Header;
