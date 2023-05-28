import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const { user } = useAuth0();
  console.log(user);

  return (
    <div className="header">
      <Link to={"/"}>Home</Link>
      {!user && <LoginButton />}
      {user && <Link to={"/profile/" + user.sub.split("|")[1]}>Profile</Link>}
      {user && <LogoutButton />}
    </div>
  );
}

export default Header;
