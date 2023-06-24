import React from "react";
import "./OnboardingPage.scss";
import { useAuth0 } from "@auth0/auth0-react";
import UserForm from "../../components/UserForm/UserForm";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { FoodEmoji } from "../../enums/Emojis";
import { splitUserSub } from "../../helpers/stringHelpers";

function OnboardingPage() {
  const { user } = useAuth0();
  const userSub = splitUserSub(user?.sub);

  return (
    <div className="profile-page-container">
      <div className="title-container">
        <PageTitleBar
          title={"Let's get you onboarded!"}
          emojiType={"food"}
          emoji={FoodEmoji.AVOCADO}
          color="#8fa2e3"
        />
      </div>

      <UserForm
        user={user?.sub}
        userId={userSub}
        userInDatabase={false}
        sourcePage={"OnboardingPage"}
      />
    </div>
  );
}

export default OnboardingPage;
