import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './Context';

function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const fetchMealApi = (option, busca) => {
    let url = 'https://www.themealdb.com/api/json/v1/1/';
    if (option === 'ingredient') url += `filter.php?i=${busca}`;
    if (option === 'name') url += `search.php?s=${busca}`;
    if (option === 'first') url += `search.php?f=${busca}`;
    fetch(url)
      .then((res) => res.json()).then((data) => setMeals(data.meals))
      .catch((error) => console.error(error));
  };

  const value = useMemo(() => ({
    meals,
    fetchMealApi,
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
