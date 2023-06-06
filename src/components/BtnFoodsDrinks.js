import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApiCategory, mealsApiCategory } from './RecipeApi';

function BtnFoodsDrinks() {
  const maxCategory = 5;
  const categoryIndex = 0;
  const location = useLocation();
  const [foodCategory, setMealsCategory] = useState([]);
  const [drinkCategory, setDrinksCategory] = useState([]);

  const updateApi = async () => {
    const { drinks } = await drinkApiCategory();
    const { meals } = await mealsApiCategory();
    setDrinksCategory(drinks);
    setMealsCategory(meals);
  };

  useEffect(() => {
    updateApi();
  }, []);
  return (
    <div>
      {location.pathname === '/meals' ? (foodCategory
        .slice(categoryIndex, categoryIndex + maxCategory)
        .map((meals, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button data-testid={ `${meals.strCategory}-category-filter` }>
              {meals.strCategory}

            </button>
          </div>
        ))) : (drinkCategory.slice(categoryIndex, categoryIndex + maxCategory)
        .map((drinks, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <button data-testid={ `${drinks.strCategory}-category-filter` }>
              {drinks.strCategory}

            </button>
          </div>
        )))}
    </div>
  );
}
export default BtnFoodsDrinks;
