import React from "react";
import { FoodEmoji, SymbolEmoji } from "../../enums/Emojis";
// face emojis
import oopsFace from "../../assets/images/faces/oops_face.svg";
// food emojis
import banana from "../../assets/images/food/banana_flat.svg";
import beer from "../../assets/images/food/beer_mug_flat.svg";
import bentoBox from "../../assets/images/food/bento_box_flat.svg";
import birthdayCake from "../../assets/images/food/birthday_cake_flat.svg";
import bread from "../../assets/images/food/bread_flat.svg";
import bubbleTea from "../../assets/images/food/bubble_tea_flat.svg";
import cheeseWedge from "../../assets/images/food/cheese_wedge_flat.svg";
import cherries from "../../assets/images/food/cherries_flat.svg";
import cooking from "../../assets/images/food/cooking_flat.svg";
import corn from "../../assets/images/food/ear_of_corn_flat.svg";
import croissant from "../../assets/images/food/croissant_flat.svg";
import dango from "../../assets/images/food/dango_flat.svg";
import dumpling from "../../assets/images/food/dumpling_flat.svg";
import forkKnifePlate from "../../assets/images/food/fork_and_knife_with_plate_flat.svg";
import hotDog from "../../assets/images/food/hot_dog_flat.svg";
import oden from "../../assets/images/food/oden_flat.svg";
import sandwich from "../../assets/images/food/sandwich_flat.svg";
import sushi from "../../assets/images/food/sushi_flat.svg";
import waffle from "../../assets/images/food/waffle_flat.svg";
import watermelon from "../../assets/images/food/watermelon_flat.svg";
// symbol emojis
import fire from "../../assets/images/symbols/fire.svg";
import page from "../../assets/images/symbols/page.svg";
import pencil from "../../assets/images/symbols/pencil.svg";
import sparklingHeart from "../../assets/images/symbols/sparkling_heart_flat.svg";

function Emoji(props) {
  let emoji;
  switch (props.name) {
    case FoodEmoji.BANANA:
      emoji = banana;
      break;
    case FoodEmoji.BEER:
      emoji = beer;
      break;
    case FoodEmoji.BENTO:
      emoji = bentoBox;
      break;
    case FoodEmoji.BIRTHDAY_CAKE:
      emoji = birthdayCake;
      break;
    case FoodEmoji.BREAD:
      emoji = bread;
      break;
    case FoodEmoji.BUBBLE_TEA:
      emoji = bubbleTea;
      break;
    case FoodEmoji.CHEESE_WEDGE:
      emoji = cheeseWedge;
      break;
    case FoodEmoji.CHERRIES:
      emoji = cherries;
      break;
    case FoodEmoji.COOKING:
      emoji = cooking;
      break;
    case FoodEmoji.CORN:
      emoji = corn;
      break;
    case FoodEmoji.CROISSANT:
      emoji = croissant;
      break;
    case FoodEmoji.DANGO:
      emoji = dango;
      break;
    case FoodEmoji.DUMPLING:
      emoji = dumpling;
      break;
    case FoodEmoji.FORK_KNIFE_PLATE:
      emoji = forkKnifePlate;
      break;
    case FoodEmoji.HOT_DOG:
      emoji = hotDog;
      break;
    case FoodEmoji.ODEN:
      emoji = oden;
      break;
    case FoodEmoji.SANDWICH:
      emoji = sandwich;
      break;
    case FoodEmoji.SUSHI:
      emoji = sushi;
      break;
    case FoodEmoji.WAFFLE:
      emoji = waffle;
      break;
    case FoodEmoji.WATERMELON:
      emoji = watermelon;
      break;
    // symbols
    case SymbolEmoji.FIRE:
      emoji = fire;
      break;
    case SymbolEmoji.PAGE:
      emoji = page;
      break;
    case SymbolEmoji.PENCIL:
      emoji = pencil;
      break;
    case SymbolEmoji.SPARKLING_HEART:
      emoji = sparklingHeart;
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
