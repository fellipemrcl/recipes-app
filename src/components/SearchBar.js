import React, { useContext, useState } from 'react';
import recipeContext from '../context/Context';

export default function SearchBar() {
  const { fetchMealApi } = useContext(recipeContext);
  const [options, setOptions] = useState({
    text: '',
    radio: '',
  });
  const handleChange = (event) => {
    setOptions({ ...options, text: event.target.value });
  };
  const handleChangeRadio = (event) => {
    setOptions({ ...options, radio: event.target.name });
  };
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
        name="search"
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="ingredient"
          checked={ options.radio === 'ingredient' }
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          name="name"
          checked={ options.radio === 'name' }
          onChange={ handleChangeRadio }
        />
      </label>
      <label htmlFor="first letter">
        First letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="first"
          checked={ options.radio === 'first' }
          onChange={ handleChangeRadio }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (options.radio === 'first' && options.text.length !== 1) {
            global.alert('Your search must have only 1 (one) character');
            return;
          }
          fetchMealApi(options.radio, options.text);
        } }
      >
        Search
      </button>
    </div>
  );
}
