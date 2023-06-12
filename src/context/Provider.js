import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import recipeContext from './Context';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [saveMeals, setSaveMeals] = useState('');
  const [saveDrink, setSaveDrink] = useState('');
  const [validatorCategory, setValidatorCategory] = useState(false);
  const [id, setId] = useState('');
  const history = useHistory();

  const fetchMeals = (url) => {
    fetch(url).then((res) => res.json()).then((data) => {
      if (data.meals === null) {
        setMeals([]);
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setMeals(data.meals);
      if (data.meals.length === 1) {
        history.push(`/meals/${data.meals[0].idMeal}`);
      }
    }).catch((error) => console.error(error));
  };

  const fetchDrinks = (url) => {
    fetch(url).then((res) => res.json()).then((data) => {
      if (data.drinks === null) {
        setDrinks([]);
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      setDrinks(data.drinks);
      if (data.drinks.length === 1) {
        history.push(`/drinks/${data.drinks[0].idDrink}`);
      }
    }).catch((error) => console.error(error));
  };

  const fetchMealApi = (option, busca, pathname) => {
    const mealUrl = 'https://www.themealdb.com/api/json/v1/1/';
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

    let url = pathname === '/meals' ? mealUrl : drinkUrl;

    if (option === 'ingredient') url += `filter.php?i=${busca}`;
    if (option === 'name') url += `search.php?s=${busca}`;
    if (option === 'first') url += `search.php?f=${busca}`;

    if (pathname === '/meals') {
      fetchMeals(url);
    } else {
      fetchDrinks(url);
    }
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
