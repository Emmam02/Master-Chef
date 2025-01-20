import React, { useState } from "react";
import IngridientsList from "./IngridientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState(["Chicken"]);

  const [recipeShown, setRecipeShown] = useState(false);
  const [recipe, setRecipe] = useState("");

  async function toggleRecipeShown() {
    if (!recipeShown) {
      try {
        const response = await getRecipeFromMistral(ingredients);
        setRecipe(response);
      } catch (err) {
        console.error("Error getting recipe:", err);
        setRecipe("Could not fetch recipe.");
      }
    }
    setRecipeShown((prevShown) => !prevShown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function removeIngredient(ingredient) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngridientsList
          toggleRecipeShown={toggleRecipeShown}
          ingredients={ingredients}
          removeIngredient={removeIngredient}
        />
      )}

      {recipeShown && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
