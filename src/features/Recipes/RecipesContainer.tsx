import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "./RecipeCard";
import "./style.css";

export function RecipeContainer() {
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
    <div className="recipe-container">
      {recipes.map((recipe: any) => (
        <RecipeCard recipe={recipe} />
      ))}
    </div>
  );
}
