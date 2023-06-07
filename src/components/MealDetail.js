import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function MealDetail() {
  const [meal, setMeal] = useState({});
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);

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
  }, []);
  return (
    <div>
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
      <iframe
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
