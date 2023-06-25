import React, { useState } from "react";
import "./OnboardingPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import UserForm from "../../components/UserForm/UserForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import { splitUserSub } from "../../helpers/stringHelpers";
import { useLocation } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function OnboardingPage() {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);
  const redirectedFromProfile = useLocation().state?.from === "profile";

  // error handling
  const [showError, setShowError] = useState(redirectedFromProfile);

  return (
    <div className="onboarding-container">
      {redirectedFromProfile && showError && (
        <ErrorPopup
          message={"Please finish onboarding before proceeding!"}
          setShowError={setShowError}
        />
      )}
      <div className="title-container">
        <PageTitleBar
          title={"Let's get you onboarded!"}
          emojiType={"food"}
          emoji={FoodEmoji.AVOCADO}
          color="#8fa2e3"
        />
      </div>

      <div className="onboarding-user-container">
        <UserForm
          user={user?.sub}
          userId={userSub}
          userInDatabase={false}
          sourcePage={"OnboardingPage"}
        />
      </div>
    </div>
  );
}

export default OnboardingPage;
