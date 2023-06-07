import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './Context';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [saveMeals, setSaveMeals] = useState('');
  const [saveDrink, setSaveDrink] = useState('');
  const [validatorCategory, setValidatorCategory] = useState(false);
  const [id, setId] = useState('');
  const fetchMealApi = (option, busca, pathname) => {
    const mealUrl = 'https://www.themealdb.com/api/json/v1/1/';
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

    let url = pathname === '/meals' ? mealUrl : drinkUrl;

    if (option === 'ingredient') url += `filter.php?i=${busca}`;
    if (option === 'name') url += `search.php?s=${busca}`;
    if (option === 'first') url += `search.php?f=${busca}`;
    fetch(url)
      .then((res) => res.json()).then((data) => {
        if (pathname === '/meals') setMeals(data.meals);
        if (pathname === '/drinks') setDrinks(data.drinks);
      })
      .catch((error) => console.error(error));

    // if (data.meals.length === 0) {
    //   global.alert('Sorry, we haven\'t found any recipes for these filters');
    // }
  };

  const value = useMemo(() => ({
    meals,
    drinks,
    setDrinks,
    setMeals,
    fetchMealApi,
    saveMeals,
    setSaveMeals,
    saveDrink,
    setSaveDrink,
    validatorCategory,
    setValidatorCategory,
    id,
    setId,
  }), [fetchMealApi]);

  return (
    <recipeContext.Provider value={ value }>
      {children}
    </recipeContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Provider;
