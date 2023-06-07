import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import recipeContext from '../context/Context';
import { filterCategory } from './RecipeApi';

function ComponentsFilters() {
  const maxCategory = 12;
  const categoryIndex = 0;
  const location = useLocation();
  const history = useHistory();
  const [foodCategory, setMealsCategory] = useState([]);
  const [drinkCategory, setDrinksCategory] = useState([]);
  const { saveMeals, saveDrink, validatorCategory, setId } = useContext(recipeContext);

  const filterCategoryApi = async () => {
    if (location.pathname === '/meals') {
      const { meals } = await filterCategory(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${saveMeals}`);
      setMealsCategory(meals);
    } else {
      const { drinks } = await filterCategory(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${saveDrink}`);
      setDrinksCategory(drinks);
    }
  };

  useEffect(() => {
    filterCategoryApi();
  }, []);

  const handleClick = ({ target }) => {
    if (location.pathname === '/meals') {
      setId(target.alt);
      history.push(`/meals/${target.alt}`);
    } else {
      setId(target.alt);
      history.push(`/drinks/${target.alt}`);
    }
  };

  return (
    <div>
      {validatorCategory === true ? (
        <div>
          {location.pathname === '/meals' ? (foodCategory
            .slice(categoryIndex, categoryIndex + maxCategory)
            .map((meals, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  onClick={ handleClick }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ meals.idMeal }
                    src={ meals.strMealThumb }
                  />
                </button>
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {meals.strMeal}

                </h3>
              </div>
            ))) : (drinkCategory.slice(categoryIndex, categoryIndex + maxCategory)
            .map((drinks, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  onClick={ handleClick }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ drinks.idDrink }
                    src={ drinks.strDrinkThumb }
                  />
                </button>
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {drinks.strDrink}

                </h3>
              </div>
            )))}
        </div>
      ) : (<div />)}
    </div>
  );
}
export default ComponentsFilters;
