import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { userStore } from "../../stores/user";
import { authStore } from "../../stores/auth";

const AuthorizationButton = (props) => {
  const { loginWithRedirect, logout } = useAuth0();

  const resetStores = () => {
    authStore.getState().setAccessToken("");
    userStore.getState().setSub("");
    userStore.getState().setWholeSub("");
  };

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
        onClick={() => {
          resetStores();
          logout({ logoutParams: { returnTo: window.location.origin } });
        }}
      >
        Sign out
      </button>
    );
  }
};

export default AuthorizationButton;
