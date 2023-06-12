import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

function DrinksInProgress() {
  const [drink, setDrink] = useState({});
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const getFoodInfo = async () => {
      try {
        const foodInfo = await fetch(url);
        const data = await foodInfo.json();
        const { drinks } = data;

        setDrink(drinks[0]);
        const ingredientAmount = 15;
        const ingredientsWithMeasure = [];
        for (let index = 1; index <= ingredientAmount; index += 1) {
          const currentIngredient = `strIngredient${index}`;
          const currentMeasure = `strMeasure${index}`;
          const ingredient = drinks[0][currentIngredient];
          const measure = drinks[0][currentMeasure];
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
      <div>
        <img
          src={ drink.strDrinkThumb }
          data-testid="recipe-photo"
          alt={ drink.strDrink }
        />
        <h1 data-testid="recipe-title">{ drink.strDrink}</h1>
        <p data-testid="recipe-category">{ drink.strCategory}</p>
        <p>{ drink.strAlcoholic}</p>
      </div>

      <button data-testid="share-btn">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn">Favoritar</button>

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
        <p>{ drink.strInstructions}</p>
      </div>

      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default DrinksInProgress;
