import React from "react";
import "./Footer.scss";
import { SymbolEmoji } from "../../enums/Emojis";
import Emoji from "../../components/Emoji/Emoji";

function Footer() {
  return (
    <div className="footer">
      <h3>Made by</h3>
      <Emoji
        type={"symbols"}
        name={SymbolEmoji.HIBISCUS}
        width={25}
        height={25}
        style={{ marginLeft: "15px", marginRight: "0px" }}
      />
      <a
        href={"https://azhhng.netlify.app"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Alice.
      </a>
    </div>
  );
}

export default Footer;
