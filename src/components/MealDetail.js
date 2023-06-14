import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import Button from './Button';
import BtnFavorite from './BtnFavorite';
import shareIcon from '../images/shareIcon.svg';

import './MealDetail.css';

export default function MealDetail() {
  const [meal, setMeal] = useState({
    strMealThumb: '',
    strMeal: '',
    strYoutube: '',
    strInstructions: '',
  });
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    const recipeLink = window.location.href;
    copy(recipeLink);
    setCopyMessage('Link copied!');
  };

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFoodInfo = async () => {
      const foodInfo = await fetch(url).then((response) => response.json());
      setMeal(foodInfo.meals[0]);

      const ingredientAmount = 20;
      const ingredientsWithMeasure = [];
      for (let index = 1; index <= ingredientAmount; index += 1) {
        const currentIngredient = `strIngredient${index}`;
        const currentMeasure = `strMeasure${index}`;
        const ingredient = foodInfo.meals[0][currentIngredient];
        const measure = foodInfo.meals[0][currentMeasure];
        if (measure !== null && measure !== ''
          && ingredient !== null && ingredient !== '') {
          ingredientsWithMeasure.push(`${ingredient} - ${measure}`);
        }
      }
      setIngredients(ingredientsWithMeasure);
    };

    getFoodInfo();
  }, [id]);

  return (
    <div className="meal-detail-container">
      <img
        alt="imagem da receita"
        data-testid="recipe-photo"
        src={ meal.strMealThumb }
      />
      <h1
        data-testid="recipe-title"
      >
        {meal.strMeal}
      </h1>
      <div>
        <Button
          onClick={ handleCopy }
          id="share-btn"
          text={ <img src={ shareIcon } alt="Share Button" /> }
        />
        <BtnFavorite
          id={ meal.idMeal }
          type="meal"
          nationality={ meal.strArea }
          category={ meal.strCategory }
          alcoholicOrNot=""
          name={ meal.strMeal }
          image={ meal.strMealThumb }
        />
      </div>
      <p>{copyMessage}</p>
      <iframe
        data-testid="video"
        title="video da receita"
        width="420"
        height="315"
        src={ meal.strYoutube }
      />
      <h3
        data-testid="recipe-category"
      >
        {meal.strCategory}
      </h3>
      {ingredients.map((ingredient, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </p>))}
      <p
        data-testid="instructions"
      >
        {meal.strInstructions}
      </p>
    </div>
  );
}
