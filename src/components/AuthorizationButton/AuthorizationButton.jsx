import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthorizationButton = (props) => {
  const { loginWithRedirect, logout } = useAuth0();

  if (props.action === "signup") {
    return (
      <button onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
        Sign Up
      </button>
    );
  } else if (props.action === "login") {
    return <button onClick={() => loginWithRedirect()}>Login</button>;
  } else if (props.action === "logout") {
    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Sign Out
      </button>
    );
  }
};

export default AuthorizationButton;
