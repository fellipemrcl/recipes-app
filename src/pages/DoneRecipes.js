import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { filterCategory } from '../components/RecipeApi';

function DoneRecipes() {
  const [doneMeals, setDoneMeals] = useState([]);
  const [doneDrinks, setDoneDrinks] = useState([]);
  const data = '13/12/2020';

  const doneRecipes = async () => {
    const { meals } = await filterCategory('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
    const { drinks } = await filterCategory('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007');
    setDoneMeals(meals);
    setDoneDrinks(drinks);
  };

  useEffect(() => {
    doneRecipes();
  }, []);

  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {doneMeals.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.strMealThumb }
            alt={ recipe.strMealThumb }
          />
          <h2 data-testid={ `${index}-horizontal-top-text` }>{recipe.strCategory}</h2>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.strMeal}</h2>
          <h5 data-testid={ `${index}-horizontal-done-date` }>{data}</h5>
          <input
            type="button"
            value="Compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <h2
            data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
          >
            {recipe.strTags}

          </h2>
        </div>
      ))}
      {doneDrinks.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrinkThumb }
          />
          <h2 data-testid={ `${index}-horizontal-top-text` }>{recipe.strCategory}</h2>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.strDrink}</h2>
          <h5 data-testid={ `${index}-horizontal-done-date` }>{data}</h5>
          <input
            type="button"
            value="Compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          <h2
            data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
          >
            {recipe.strTags}

          </h2>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
