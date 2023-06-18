import React, { useEffect, useState } from "react";
import "./ProfilePage.scss";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UserForm from "../../components/UserForm/UserForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function ProfilePage() {
  const { user } = useAuth0();
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
          `${process.env.REACT_APP_API_ADDRESS}/user/${user?.sub}`
        );
        console.log("Getting user information...");
        if (response.data.length === 0) {
          setIsUserFormOpen(true);
          setUserInDatabase(false);
        } else {
          setAppUser(response.data[0]);
          setUserInDatabase(true);
          setIsUserFormOpen(false);
        }
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getUser();
  }, [user]);

  return (
    <div className="profile-page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <PageTitleBar
        title={appUser?.name ? `Hi there, ${appUser?.name}!` : "Hi there!"}
        emojiType={"food"}
        emoji={appUser?.emoji ?? FoodEmoji.AVOCADO}
        color="#8fa2e3"
      />
      <button onClick={() => deleteUser()}>Delete account</button>
      <button onClick={() => setIsUserFormOpen(true)}>Edit settings</button>
      {isUserFormOpen && (
        <UserForm
          user={appUser}
          userId={user?.sub}
          userInDatabase={userInDatabase}
          setIsUserFormOpen={setIsUserFormOpen}
        />
      )}
    </div>
  );
}

export default ProfilePage;
