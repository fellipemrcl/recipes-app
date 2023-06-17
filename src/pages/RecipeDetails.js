import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';

import '../styles/RecipeDetails.css';

const mockLocalStorage = {
  drinks: {
    15997: [],
  },
  meals: {
    52977: [],
  },
};

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isMeal, setIsMeal] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isMealsPage = history.location.pathname.includes('meals');
      if (isMealsPage) {
        setIsMeal(true);
      } else {
        setIsMeal(false);
      }
      const recommendationUrl = isMealsPage
        ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const recommendationData = await fetch(recommendationUrl)
        .then((response) => response.json());
      setRecommendation(recommendationData);
    };
    fetchData();
  }, [history.location.pathname, id]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const isDone = doneRecipes.some((recipe) => recipe.id === id);
      setIsRecipeDone(isDone);
    }
  }, [id]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(mockLocalStorage));
    }
    setIsRecipeInProgress(
      inProgressRecipes
      && (inProgressRecipes.drinks[id]
        || inProgressRecipes.meals[id]
      ),
    );
  }, [id]);

  const redirectToInProgressPage = () => {
    if (isMeal) {
      history.push(`/meals/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };
  const magicNumberSix = 6;

  return (
    <div>
      {isMeal ? <MealDetail /> : <DrinkDetail />}
      {recommendation && (
        <div className="recommendations-container">
          <h2>Recommendations:</h2>
          <div
            className="recommendation-father"
            ref={ scrollContainerRef }
            style={ {
              display: 'flex',
              overflowX: 'scroll',
              height: '100%',
            } }
          >
            {recommendation.drinks ? (
              recommendation.drinks.slice(0, magicNumberSix).map((drink, index) => (
                <div
                  className="recommendation-box"
                  key={ index }
                  data-testid={ `${index}-recommendation-card` }
                  style={ {
                    flex: '0 0 calc(400px / 2)',
                    marginRight: '10px',
                  } }
                >
                  <p data-testid={ `${index}-recommendation-title` }>
                    {drink.strDrink}
                  </p>
                  <img
                    className="recommendation-image"
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                </div>
              ))
            ) : (
              recommendation.meals.slice(0, magicNumberSix).map((meal, index) => (
                <div
                  className="recommendation-box"
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
        </div>
      )}
      {!isRecipeDone && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ redirectToInProgressPage }
        >
          {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}
export default RecipeDetails;
