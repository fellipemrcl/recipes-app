import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import Button from './Button';
import BtnFavorite from './BtnFavorite';
import shareIcon from '../images/shareIcon.svg';

export default function DrinkDetail() {
  const [drink, setDrink] = useState({
    strDrinkThumb: '',
    strDrink: '',
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
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFoodInfo = async () => {
      try {
        const foodInfo = await fetch(url).then((response) => response.json());

        setDrink(foodInfo.drinks[0]);
        const ingredientAmount = 15;
        const ingredientsWithMeasure = [];
        for (let index = 1; index <= ingredientAmount; index += 1) {
          const currentIngredient = `strIngredient${index}`;
          const currentMeasure = `strMeasure${index}`;
          const ingredient = foodInfo.drinks[0][currentIngredient];
          const measure = foodInfo.drinks[0][currentMeasure];
          if (measure !== null && measure !== ''
            && ingredient !== null && ingredient !== '') {
            ingredientsWithMeasure.push(`${ingredient} - ${measure}`);
          }
        }
        setIngredients(ingredientsWithMeasure);
      } catch (error) {
        console.log(error);
      }
    };
    getFoodInfo();
  }, []);

  return (
    <div>
      <img
        alt="imagem da receita"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
      />
      <h1
        data-testid="recipe-title"
      >
        {drink.strDrink}
      </h1>
      <div>
        <Button
          onClick={ handleCopy }
          id="share-btn"
          text={ <img src={ shareIcon } alt="Share Button" /> }
        />
        <BtnFavorite />
      </div>
      <p>{copyMessage}</p>
      <h3
        data-testid="recipe-category"
      >
        {drink.strAlcoholic}
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
        {drink.strInstructions}
      </p>
    </div>
  );
}
