import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Emoji from "../Emoji/Emoji";
import { Emojis } from "../../enums/Emojis";

function Header() {
  const { user } = useAuth0();

  return (
    <div className="header">
      <Emoji name={Emojis.BENTO} width={50} height={35} />
      <Link to={"/"}>Home</Link>
      {!user && <LoginButton />}
      {user && <Link to={"/profile/" + user.sub.split("|")[1]}>Profile</Link>}
      {user && <LogoutButton />}
    </div>
  );
}

export default Header;
