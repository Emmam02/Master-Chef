import React from "react";

const IngridientsList = (props) => {
  const { ingredients, removeIngredient, toggleRecipeShown } = props;

  return (
    <section>
      <h2 className="ingredients-list-heading">Ingredients on hand:</h2>
      <p className="rules">
        (You need more than 3 ingredients to generate a recipe)
      </p>
      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button
              onClick={() => removeIngredient(ingredient)}
              aria-label={`Remove ${ingredient}`}
              className="remove-ingredient-btn"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={toggleRecipeShown}>Get a recipe</button>
        </div>
      )}
    </section>
  );
};

export default IngridientsList;
