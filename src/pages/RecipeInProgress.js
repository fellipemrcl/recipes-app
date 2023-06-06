import React from 'react';

function RecipeInProgress() {
  return (
    <div>
      <img
        src="caminho/para/imagem.jpg"
        data-testid="recipe-photo"
        alt="Imagem da Receita"
      />
      <h1 data-testid="recipe-title">Título da Receita</h1>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria da Receita</p>
      <ul>
        <li>Ingrediente 1 - Quantidade 1</li>
        <li>Ingrediente 2 - Quantidade 2</li>
        <li>Ingrediente 3 - Quantidade 3</li>
      </ul>
      <div data-testid="instructions">
        <h2>Instruções</h2>
        <p>Passo 1: Lorem ipsum dolor sit amet...</p>
        <p>Passo 2: Lorem ipsum dolor sit amet...</p>
        <p>Passo 3: Lorem ipsum dolor sit amet...</p>
      </div>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
