import React, { useState, useRef, useEffect } from "react";
import IngridientsList from "./IngridientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState(["Chicken"]);
  const [recipeShown, setRecipeShown] = useState(false);
  const [recipe, setRecipe] = useState("");

  const recipeSection = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (recipe !== "" && recipeSection !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

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

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newIngredient = formData.get("ingredient");
    const input = document.querySelector("input[type='text']");

    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    } else if (newIngredient) {
      alert(`${newIngredient} is already in the list!`);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeIngredient(ingredient) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          ref={inputRef}
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
          recipeSection={recipeSection}
        />
      )}

      {recipeShown && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
