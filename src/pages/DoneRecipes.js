import React from 'react';
import Header from '../components/Header';
import btnShare from '../images/shareIcon.svg';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: 'Pasta',
    tags2: 'Curry',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {mockDoneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.image }
          />
          <h2 data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</h2>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
          <h2
            data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
          >
            {recipe.tags}

          </h2>
          <h2
            data-testid={ `${index}-${recipe.tags2}-horizontal-tag` }
          >
            {recipe.tags2}

          </h2>
          <h2
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}

          </h2>
          <h5 data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</h5>
          <h5 data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</h5>
          <button
            src={ btnShare }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Compartilhar
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
