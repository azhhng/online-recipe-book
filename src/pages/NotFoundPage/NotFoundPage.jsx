import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";
import Emoji from "../../components/Emoji/Emoji";
import { FaceEmoji } from "../../enums/Emojis";

function NotFoundPage() {
  return (
    <div className="not-found-page-container">
      <div className="error-container">
        <h2> 404 Not found.</h2>
        <Emoji
          type={"faces"}
          name={FaceEmoji.WORRIED_FACE}
          width={30}
          height={30}
        />
      </div>
      <h2>
        We can't find what you're looking for. Let's go back
        <Link to={"/"}>home</Link>.
      </h2>
    </div>
  );
}

export default NotFoundPage;
