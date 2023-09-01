import React, { useEffect, useState } from "react";
import "./ExplorePage.scss";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { SymbolEmoji } from "../../enums/Emojis";
import { retrieveVerifiedUsersRecipeBoxes } from "../../api/user";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function ExplorePage() {
  const [verifiedBoxes, setVerifiedBoxes] = useState([]);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getVerifiedUsersRecipeBoxes = async () => {
      try {
        const response = await retrieveVerifiedUsersRecipeBoxes();
        setVerifiedBoxes(response.data);
        console.log(response);
      } catch (error) {
        setShowError(true);
        setErrorMessage(error.response.data);
      }
    };
    getVerifiedUsersRecipeBoxes();
  }, []);
  return (
    <div className="explore-page-container">
      {showError && (
        <ErrorPopup message={errorMessage} setShowError={setShowError} />
      )}
      <PageTitleBar
        title="Explore"
        emojiType={"symbols"}
        emoji={SymbolEmoji.MIRROR_BALL}
        color="#8fa2e3"
      />
    </div>
  );
}

export default ExplorePage;
