import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApiCategory, mealsApiCategory } from './RecipeApi';
import recipeContext from '../context/Context';

function BtnFoodsDrinks() {
  const maxCategory = 5;
  const categoryIndex = 0;
  const location = useLocation();
  const [foodFiltes, setMealsCategory] = useState([]);
  const [drinkFilters, setDrinksCategory] = useState([]);
  const { setSaveMeals, setSaveDrink, setValidatorCategory,
    validatorCategory } = useContext(recipeContext);

  const btnCategoryApi = async () => {
    const { drinks } = await drinkApiCategory();
    const { meals } = await mealsApiCategory();
    setDrinksCategory(drinks);
    setMealsCategory(meals);
  };

  useEffect(() => {
    btnCategoryApi();
  }, []);

  const handleClickChange = ({ target }) => {
    if (validatorCategory === true) {
      setSaveMeals('');
      setSaveDrink('');
      setValidatorCategory(false);
    } else {
      setSaveMeals(target.value);
      setSaveDrink(target.value);
      setValidatorCategory(true);
    }
  };

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => {
          setValidatorCategory(false);
        } }
      >
        All

      </button>
      {location.pathname === '/meals' ? (foodFiltes
        .slice(categoryIndex, categoryIndex + maxCategory)
        .map((meals, index) => (
          <div key={ index }>
            <button
              data-testid={ `${meals.strCategory}-category-filter` }
              value={ meals.strCategory }
              onClick={ handleClickChange }
            >
              {meals.strCategory}

            </button>
          </div>
        ))) : (drinkFilters.slice(categoryIndex, categoryIndex + maxCategory)
        .map((drinks, index) => (
          <div key={ index }>
            <button
              data-testid={ `${drinks.strCategory}-category-filter` }
              value={ drinks.strCategory }
              onClick={ handleClickChange }
            >
              {drinks.strCategory}

            </button>
          </div>
        )))}
    </div>
  );
}
export default BtnFoodsDrinks;
