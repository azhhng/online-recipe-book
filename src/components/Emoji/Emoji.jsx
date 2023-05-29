import React from "react";
import { Emojis } from "../../enums/Emojis";
import oopsFace from "../../assets/images/faces/oops_face.svg";
import bentoBox from "../../assets/images/food/bento_box_flat.svg";
import banana from "../../assets/images/food/banana_flat.svg";
import corn from "../../assets/images/food/ear_of_corn_flat.svg";
import cherries from "../../assets/images/food/cherries_flat.svg";
import hotDog from "../../assets/images/food/hot_dog_flat.svg";

function Emoji(props) {
  let emoji;
  switch (props.name) {
    case Emojis.BANANA:
      emoji = banana;
      break;
    case Emojis.BENTO:
      emoji = bentoBox;
      break;
    case Emojis.CORN:
      emoji = corn;
      break;
    case Emojis.CHERRIES:
      emoji = cherries;
      break;
    case Emojis.HOT_DOG:
      emoji = hotDog;
      break;
    default:
      emoji = oopsFace;
      break;
  }
  return (
    <img src={emoji} alt="ponyo" width={props.width} height={props.height} />
  );
}

export default Emoji;
