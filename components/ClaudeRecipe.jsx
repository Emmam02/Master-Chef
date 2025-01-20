import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Fjerne unødvenige symboler ved headings etc
const sanitizeMarkdown = (markdown) => {
  return markdown.replace(/^#+\s+/gm, "");
};

const ClaudeRecipe = (props) => {
  const sanitizedRecipe = props.recipe ? sanitizeMarkdown(props.recipe) : "";
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      {sanitizedRecipe ? (
        <>
          <h2>Chef Claude Recommends:</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sanitizedRecipe}
          </ReactMarkdown>
        </>
      ) : (
        <p>Loading recipe...</p>
      )}
    </section>
  );
};

export default ClaudeRecipe;
