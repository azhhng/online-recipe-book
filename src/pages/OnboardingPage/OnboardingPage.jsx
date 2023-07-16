import React, { useState } from "react";
import "./OnboardingPage.scss";
import UserForm from "../../components/UserForm/UserForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import { useLocation } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { userStore } from "../../stores/user";

function OnboardingPage() {
  const user = userStore((state) => state.wholeSub);
  const userSub = userStore((state) => state.sub);
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
          user={user}
          userId={userSub}
          userInDatabase={false}
          sourcePage={"OnboardingPage"}
        />
      </div>
    </div>
  );
}

export default OnboardingPage;
