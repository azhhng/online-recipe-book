import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthorizationButton = (props) => {
  const { loginWithRedirect, logout } = useAuth0();

  if (props.action === "signup") {
    return (
      <button
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
            authorizationParams: {
              redirect_uri: `${process.env.REACT_APP_ADDRESS}/onboarding`,
            },
          })
        }
      >
        Sign up
      </button>
    );
  } else if (props.action === "login") {
    return (
      <button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              redirect_uri: `${process.env.REACT_APP_ADDRESS}`,
            },
          })
        }
      >
        Login
      </button>
    );
  } else if (props.action === "logout") {
    return (
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Sign out
      </button>
    );
  }
};

export default AuthorizationButton;
