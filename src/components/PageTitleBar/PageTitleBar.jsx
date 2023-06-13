import React from "react";
import "./PageTitleBar.scss";
import Emoji from "../Emoji/Emoji";

function PageTitleBar(props) {
  return (
    <div
      className="page-title-container"
      style={{
        textDecorationColor: `${props.color}`,
      }}
    >
      <Emoji type={props.emojiType} name={props.emoji} width={50} height={50} />
      <h1>{props.title}</h1>
    </div>
  );
}

export default PageTitleBar;
