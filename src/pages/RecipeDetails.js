import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DrinkDetail from '../components/DrinkDetail';
import MealDetail from '../components/MealDetail';

function RecipeDetails() {
  const history = useHistory();
  const [isMeal, setIsMeal] = useState(true);

  useEffect(() => {
    if (history.location.pathname.includes('meals')) {
      setIsMeal(true);
    } else {
      setIsMeal(false);
    }
  }, [history.location.pathname]);

  return (
    isMeal ? <MealDetail /> : <DrinkDetail />

  );
}

export default RecipeDetails;
