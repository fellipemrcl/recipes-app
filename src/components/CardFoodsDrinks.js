import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApi, mealsApi } from './RecipeApi';
import recipeContext from '../context/Context';

function CardFoodsDrinks() {
  const maxCard = 12;
  const cardIndex = 0;
  const location = useLocation();
  // const [food, setMeals] = useState([]);
  // const [drink, setDrinks] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);
  const { meals, setMeals, drinks, setDrinks } = useContext(recipeContext);

  const updateApi = async () => {
    const drinksData = await drinkApi();
    const mealsData = await mealsApi();
    setDrinks(drinksData.drinks);
    setMeals(mealsData.meals);
    setIsLoanding(false);
  };

  useEffect(() => {
    updateApi();
  }, []);
  return (
    <div>
      {!isLoading ? (
        <div>
          {location.pathname === '/meals' ? (meals.slice(cardIndex, cardIndex + maxCard)
            .map((meal, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ meal.strMealThumb }
                  src={ meal.strMealThumb }
                />
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {meal.strMeal}

                </h3>
              </div>
            ))) : (drinks.slice(cardIndex, cardIndex + maxCard)
            .map((drink, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ drink.strDrinkThumb }
                  src={ drink.strDrinkThumb }
                />
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {drink.strDrink}

                </h3>
              </div>
            )))}
        </div>
      ) : (
        <div>
          <h1>Carregando</h1>
        </div>
      )}
    </div>
  );
}
export default CardFoodsDrinks;
