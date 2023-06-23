import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProfilePage.scss";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UserForm from "../../components/UserForm/UserForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { splitUserSub, splitPathSub } from "../../helpers/stringHelpers";

// TODO fix calling API with user?.sub and base it off the url instead
// TODO fix alignment of editing profile form
function ProfilePage() {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const currentProfileSub = splitPathSub(useLocation().pathname);
  const { logout } = useAuth0();
  const [appUser, setAppUser] = useState({});
  const [userInDatabase, setUserInDatabase] = useState(true);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}`
      );
      console.log(response);
      console.log("Deleting a user...");
      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.response.data);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/user/${currentProfileSub}`
        );
        console.log("Getting user information...");
        setAppUser(response.data[0]);
        setUserInDatabase(true);
        setIsUserFormOpen(false);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getUser();
  }, [currentProfileSub]);

  return (
    <div className="profile-page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <div className="title-container">
        <PageTitleBar
          title={appUser?.name ? `Hi there, ${appUser?.name}!` : "Hi there!"}
          emojiType={"food"}
          emoji={appUser?.emoji ?? FoodEmoji.AVOCADO}
          color="#8fa2e3"
        />
        <button onClick={() => deleteUser()}>Delete account</button>
        <button onClick={() => setIsUserFormOpen(true)}>Edit settings</button>
      </div>
      {isUserFormOpen && (
        <UserForm
          user={appUser}
          userId={userSub}
          userInDatabase={userInDatabase}
          setIsUserFormOpen={setIsUserFormOpen}
          sourcePage={"ProfilePage"}
        />
      )}
    </div>
  );
}

export default ProfilePage;
