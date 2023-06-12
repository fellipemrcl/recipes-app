import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/';
import shareIcon from '../images/shareIcon.svg';

function MealsInProgress() {
  const [meal, setMeal] = useState({});
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const getFoodInfo = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const foodInfo = await fetch(url);
    const data = await foodInfo.json();
    const { meals } = data;
    setMeal(meals[0]);

    const ingredientAmount = 20;
    const ingredientsWithMeasure = [];
    for (let index = 1; index <= ingredientAmount; index += 1) {
      const currentIngredient = `strIngredient${index}`;
      const currentMeasure = `strMeasure${index}`;
      const ingredient = meals[0][currentIngredient];
      const measure = meals[0][currentMeasure];
      if (measure !== null && measure !== ''
        && ingredient !== null && ingredient !== '') {
        ingredientsWithMeasure.push(`${ingredient} - ${measure}`);
      }
    }
    setIngredients(ingredientsWithMeasure);
  };
  useEffect(() => {
    getFoodInfo();
  }, []);
  console.log(ingredients);
  return (
    <div>
      <div>
        <img
          src={ meal.strMealThumb }
          data-testid="recipe-photo"
          alt={ meal.strMeal }
        />
        <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      </div>
      <button data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn">Favoritar</button>

      <p data-testid="recipe-category">{ meal.strCategory}</p>
      {
        ingredients.map((ingredient, index) => (
          <ul key={ index }>
            <li>
              <label data-testid={ `${index}-ingredient-step` }>
                <input type="checkbox" />
                { ingredient }
              </label>
            </li>
          </ul>
        ))
      }

      <div data-testid="instructions">
        <h2>Instruções</h2>
        <p>{ meal.strInstructions }</p>
      </div>

      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default MealsInProgress;
