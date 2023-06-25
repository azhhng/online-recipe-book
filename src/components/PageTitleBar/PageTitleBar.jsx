import React from "react";
import "./PageTitleBar.scss";
import Emoji from "../Emoji/Emoji";

function PageTitleBar(props) {
  return (
    <div className="page-title-container">
      <div
        className="title-bar"
        style={{
          textDecorationColor: `${props.color}`,
        }}
      >
        <Emoji
          type={props.emojiType}
          name={props.emoji}
          width={35}
          height={35}
        />
        <h1>{props.title}</h1>
      </div>
      <h3>{props.description ?? ""}</h3>
    </div>
  );
}

export default PageTitleBar;
