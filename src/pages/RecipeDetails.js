import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const scrollContainerRef = useRef(null);

  const [isMeal, setIsMeal] = useState(true);

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      setIsMeal(true);
    } else {
      setIsMeal(false);
    }
    const fetchData = async () => {
      const isMealsPage = history.location.pathname.includes('meals');
      const url = isMealsPage
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const recommendationUrl = isMealsPage
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const recommendationData = await fetch(recommendationUrl)
        .then((response) => response.json());
      setRecommendation(recommendationData);
    };

    fetchData();
  }, [history.location.pathname, id]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const magicNumberSix = 6;

  return (
    <div>
      {recommendation && (
        <div>
          <h2>Recomendação:</h2>
          <div
            ref={ scrollContainerRef }
            style={ {
              display: 'flex',
              overflowX: 'scroll',
              width: '600px',
            } }
          >
            {recommendation.drinks ? (
              recommendation.drinks.slice(0, magicNumberSix).map((drink, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  style={ {
                    flex: '0 0 calc(600px / 2)',
                    marginRight: '10px',
                    border: '1px solid black',
                    padding: '10px',
                  } }
                >
                  <p data-testid={ `${index}-recommendation-title` }>
                    {drink.strDrink}
                  </p>
                </div>
              ))
            ) : (
              recommendation.meals.slice(0, magicNumberSix).map((meal, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  style={ {
                    flex: '0 0 calc(600px / 2)',
                    marginRight: '10px',
                    border: '1px solid black',
                    padding: '10px',
                  } }
                >
                  <p data-testid={ `${index}-recommendation-title` }>
                    {meal.strMeal}
                  </p>
                </div>
              ))
            )}
          </div>
          {recommendation
          && recommendation.drinks && recommendation.drinks.length > 2 && (
            <button onClick={ scrollLeft }>
              Scroll Left
            </button>
          )}
          {recommendation
          && recommendation.drinks && recommendation.drinks.length > 2 && (
            <button onClick={ scrollRight }>
              Scroll Right
            </button>
          )}
        </div>
      )}
    </div>
  );
  return (
    isMeal ? <MealDetail /> : <DrinkDetail />

  );
}

export default RecipeDetails;
