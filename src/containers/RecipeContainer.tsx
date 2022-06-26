import { useEffect, useState } from "react";
import axios from "axios";

function RecipeContainer() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=3`
      )
      .then((res) => {
        setRecipes(res.data.recipes);
      });
  }, [API_KEY]);

  console.log(recipes);

  return (
    <>
      {recipes.map((recipe: any) => (
        <div>
          <img src={recipe.image} alt=""></img>
          <h1>{recipe.title}</h1>
        </div>
      ))}
    </>
  );
}

export default RecipeContainer;
