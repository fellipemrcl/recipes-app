import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { drinkApi, mealsApi } from './RecipeApi';

function CardFoodsDrinks() {
  const maxCard = 12;
  const cardIndex = 0;
  const location = useLocation();
  const [food, setMeals] = useState([]);
  const [drink, setDrinks] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);

  const updateApi = async () => {
    const { drinks } = await drinkApi();
    const { meals } = await mealsApi();
    setDrinks(drinks);
    setMeals(meals);
    setIsLoanding(false);
  };

  useEffect(() => {
    updateApi();
  }, []);
  return (
    <div>
      {!isLoading ? (
        <div>
          {location.pathname === '/meals' ? (food.slice(cardIndex, cardIndex + maxCard)
            .map((meals, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ meals.strMealThumb }
                  src={ meals.strMealThumb }
                />
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {meals.strMeal}

                </h3>
              </div>
            ))) : (drink.slice(cardIndex, cardIndex + maxCard)
            .map((drinks, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ drinks.strDrinkThumb }
                  src={ drinks.strDrinkThumb }
                />
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {drinks.strDrink}

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
