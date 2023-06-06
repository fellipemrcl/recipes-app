import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const url = history.location.pathname.includes('meals')
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const getFoodInfo = async () => {
      const foodInfo = await fetch(url).then((response) => response.json());
      console.log(foodInfo);
    };

    getFoodInfo();
  }, [history.location.pathname]);

  return <div>oi</div>;
}

export default RecipeDetails;
