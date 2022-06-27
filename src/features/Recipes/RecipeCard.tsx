import "./style.css";

interface Props {
  recipe: any;
}

export function RecipeCard(props: Props) {
  const { recipe } = props;

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} loading="lazy"></img>
      <h3>{recipe.title}</h3>
    </div>
  );
}
