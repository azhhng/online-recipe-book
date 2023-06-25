import React from "react";
import "./PageTitleBar.scss";
import Emoji from "../Emoji/Emoji";

function PageTitleBar(props) {
  return (
    <div className="page-title-container">
      <Emoji type={props.emojiType} name={props.emoji} width={30} height={30} />
      <h1>{props.title}</h1>
    </div>
  );
}

export default PageTitleBar;
