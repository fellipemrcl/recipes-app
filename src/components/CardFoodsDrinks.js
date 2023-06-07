import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import recipeContext from '../context/Context';
import { drinkApi, mealsApi } from './RecipeApi';

function CardFoodsDrinks() {
  const maxCard = 12;
  const cardIndex = 0;
  const history = useHistory();
  const location = useLocation();
  // const [food, setMeals] = useState([]);
  // const [drink, setDrinks] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);
  const { meals, setMeals, drinks, setDrinks, setId } = useContext(recipeContext);

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
      {!isLoading ? (
        <div>
          {location.pathname === '/meals' ? (meals.slice(cardIndex, cardIndex + maxCard)
            .map((meal, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  onClick={ handleClick }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ meal.idMeal }
                    src={ meal.strMealThumb }
                  />
                </button>
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {meal.strMeal}

                </h3>
              </div>
            ))) : (drinks.slice(cardIndex, cardIndex + maxCard)
            .map((drink, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  onClick={ handleClick }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ drink.idDrink }
                    src={ drink.strDrinkThumb }
                  />
                </button>
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
