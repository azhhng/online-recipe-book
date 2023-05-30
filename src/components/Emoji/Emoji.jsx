import React from "react";
import { Emojis } from "../../enums/Emojis";
import oopsFace from "../../assets/images/faces/oops_face.svg";
import banana from "../../assets/images/food/banana_flat.svg";
import beer from "../../assets/images/food/beer_mug_flat.svg";
import bentoBox from "../../assets/images/food/bento_box_flat.svg";
import birthdayCake from "../../assets/images/food/birthday_cake_flat.svg";
import bread from "../../assets/images/food/bread_flat.svg";
import bubbleTea from "../../assets/images/food/bubble_tea_flat.svg";
import cheeseWedge from "../../assets/images/food/cheese_wedge_flat.svg";
import cherries from "../../assets/images/food/cherries_flat.svg";
import croissant from "../../assets/images/food/croissant_flat.svg";
import corn from "../../assets/images/food/ear_of_corn_flat.svg";
import dango from "../../assets/images/food/dango_flat.svg";
import dumpling from "../../assets/images/food/dumpling_flat.svg";
import hotDog from "../../assets/images/food/hot_dog_flat.svg";
import oden from "../../assets/images/food/oden_flat.svg";
import sandwich from "../../assets/images/food/sandwich_flat.svg";
import sushi from "../../assets/images/food/sushi_flat.svg";
import waffle from "../../assets/images/food/waffle_flat.svg";
import watermelon from "../../assets/images/food/watermelon_flat.svg";

function Emoji(props) {
  let emoji;
  switch (props.name) {
    case Emojis.BANANA:
      emoji = banana;
      break;
    case Emojis.BEER:
      emoji = beer;
      break;
    case Emojis.BENTO:
      emoji = bentoBox;
      break;
    case Emojis.BIRTHDAY_CAKE:
      emoji = birthdayCake;
      break;
    case Emojis.BREAD:
      emoji = bread;
      break;
    case Emojis.BUBBLE_TEA:
      emoji = bubbleTea;
      break;
    case Emojis.CHEESE_WEDGE:
      emoji = cheeseWedge;
      break;
    case Emojis.CHERRIES:
      emoji = cherries;
      break;
    case Emojis.CROISSANT:
      emoji = croissant;
      break;
    case Emojis.CORN:
      emoji = corn;
      break;
    case Emojis.DANGO:
      emoji = dango;
      break;
    case Emojis.DUMPLING:
      emoji = dumpling;
      break;
    case Emojis.HOT_DOG:
      emoji = hotDog;
      break;
    case Emojis.ODEN:
      emoji = oden;
      break;
    case Emojis.SANDWICH:
      emoji = sandwich;
      break;
    case Emojis.SUSHI:
      emoji = sushi;
      break;
    case Emojis.WAFFLE:
      emoji = waffle;
      break;
    case Emojis.WATERMELON:
      emoji = watermelon;
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
