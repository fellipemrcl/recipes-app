import React, { useContext } from 'react';
import BtnFoodsDrinks from '../components/BtnFoodsDrinks';
import CardFoodsDrinks from '../components/CardFoodsDrinks';
import ComponentsFilters from '../components/ComponentsFilter';
import recipeContext from '../context/Context';

function Recipes() {
  const { validatorCategory } = useContext(recipeContext);

  return (
    <div>
      <BtnFoodsDrinks />
      {validatorCategory === false ? <CardFoodsDrinks /> : <ComponentsFilters />}
    </div>
  );
}

export default Recipes;
