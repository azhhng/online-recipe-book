import "./RecipeBox.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function RecipeBox(props) {
  const { user } = useAuth0();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = (
        await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/${user.sub}/recipe`
        )
      ).data;
      setRecipes(response);
      console.log(response);
    };
    getRecipes();
  }, []);

  return (
    <div className="recipe-box">
      <h3 className="recipe-box-name">{props.box.name}</h3>
      <h3>{props.box.description}</h3>
      {/* <h3>
          <Link to={link}>About</Link> \\ <a href={props.box.github}>Github</a>
        </h3> */}
    </div>
  );
}

export default RecipeBox;
