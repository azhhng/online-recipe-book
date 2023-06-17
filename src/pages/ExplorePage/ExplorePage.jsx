import React from "react";
import "./ExplorePage.scss";
import PageTitleBar from "../../components/PageTitleBar/PageTitleBar";
import { SymbolEmoji } from "../../enums/Emojis";

function ExplorePage() {
  return (
    <div className="explore-page-container">
      <PageTitleBar
        title="Explore"
        emojiType={"symbols"}
        emoji={SymbolEmoji.MIRROR_BALL}
        color="#8fa2e3"
        description="Coming soon..."
      />
    </div>
  );
}

export default ExplorePage;
