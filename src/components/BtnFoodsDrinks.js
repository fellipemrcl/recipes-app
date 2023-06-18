import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApiCategory, mealsApiCategory } from './RecipeApi';
import recipeContext from '../context/Context';

import '../styles/BtnFoodsDrinks.css';
import allFoods from '../assets/AllFoods.png';
import Beef from '../assets/beef.png';
import Breakfeat from '../assets/breakfast.png';
import Chicken from '../assets/chicken.png';
import Dessert from '../assets/dessert.png';
import Goat from '../assets/goat.png';
import allDrinks from '../assets/AllDrinks.png';
import cocktail from '../assets/cocktail.png';
import drink from '../assets/drink.png';
import other from '../assets/other.png';
import shake from '../assets/shake.png';
import cocoa from '../assets/cocoa.png';

function BtnFoodsDrinks() {
  const maxCategory = 5;
  const imgFood = [Beef, Breakfeat, Chicken, Dessert, Goat];
  const imgDrink = [drink, cocktail, shake, other, cocoa];
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
      setSaveMeals(target.alt);
      setSaveDrink(target.alt);
      setValidatorCategory(true);
    }
  };

  return (
    <div className="buttons-container">
      <button
        data-testid="All-category-filter"
        onClick={ () => {
          setValidatorCategory(false);
        } }
      >
        <img src={ location.pathname === '/meals' ? allFoods : allDrinks } alt="all" />

      </button>
      {location.pathname === '/meals' ? (foodFiltes
        .slice(categoryIndex, categoryIndex + maxCategory)
        .map((meals, index) => (
          <div
            key={ index }
            className={ `card btn-category-${meals.strCategory.toLowerCase()}` }
          >
            <button
              className={ meals.strCategory }
              data-testid={ `${meals.strCategory}-category-filter` }
              value={ meals.strCategory }
              onClick={ handleClickChange }
            >
              <img src={ imgFood[index] } alt={ meals.strCategory } />

            </button>
          </div>
        ))) : (drinkFilters.slice(categoryIndex, categoryIndex + maxCategory)
        .map((drinks, index) => (
          <div
            key={ index }
            className={ `card btn-category-${drinks.strCategory.toLowerCase()}` }
          >
            <button
              data-testid={ `${drinks.strCategory}-category-filter` }
              value={ drinks.strCategory }
              onClick={ handleClickChange }
            >
              <img src={ imgDrink[index] } alt={ drinks.strCategory } />

            </button>
          </div>
        )))}
    </div>
  );
}
export default BtnFoodsDrinks;
