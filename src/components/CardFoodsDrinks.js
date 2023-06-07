import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import recipeContext from '../context/Context';
import { drinkApi, mealsApi } from './RecipeApi';

function CardFoodsDrinks() {
  const maxCard = 12;
  const cardIndex = 0;
  const history = useHistory();
  const location = useLocation();
  const [food, setMeals] = useState([]);
  const [drink, setDrinks] = useState([]);
  const [isLoading, setIsLoanding] = useState(true);
  const { setId } = useContext(recipeContext);

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
          {location.pathname === '/meals' ? (food.slice(cardIndex, cardIndex + maxCard)
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
            ))) : (drink.slice(cardIndex, cardIndex + maxCard)
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
      ) : (
        <div>
          <h1>Carregando</h1>
        </div>
      )}
    </div>
  );
}
export default CardFoodsDrinks;
