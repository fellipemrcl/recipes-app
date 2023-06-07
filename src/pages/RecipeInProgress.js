import React from 'react';
import { useLocation } from 'react-router-dom';

function RecipeInProgress() {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/meals' ? (
        <div>
          <img
            src="caminho/para/imagem-comida.jpg"
            data-testid="recipe-photo"
            alt="Imagem da Receita de Comida"
          />
          <h1 data-testid="recipe-title">Título da Receita de Comida</h1>
          <p data-testid="recipe-category">Categoria da Receita de Comida</p>
        </div>
      ) : (
        <div>
          <img
            src="caminho/para/imagem-bebida.jpg"
            data-testid="recipe-photo"
            alt="Imagem da Receita de Bebida"
          />
          <h1 data-testid="recipe-title">Título da Receita de Bebida</h1>
          <p data-testid="recipe-category">Categoria da Receita de Bebida</p>
          <p data-testid="recipe-alcoholic">Bebida Alcoólica</p>
        </div>
      )}

      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>

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
