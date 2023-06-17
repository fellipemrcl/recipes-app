import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useContext, useState } from 'react';
import recipeContext from '../context/Context';

import '../styles/SearchBar.css';

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
  const location = useLocation();

  return (
    <div className="search-bar-container">
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
        placeholder="Search for a recipe"
        name="search"
      />
      <div className="radio-btn-container">
        <div className="ingredient-container">
          <label htmlFor="ingredient">Ingredient</label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="ingredient"
            id="ingredient"
            checked={ options.radio === 'ingredient' }
            onChange={ handleChangeRadio }
          />
        </div>
        <div className="ingredient-container">
          <label htmlFor="name">Name</label>
          <input
            type="radio"
            data-testid="name-search-radio"
            name="name"
            id="name"
            checked={ options.radio === 'name' }
            onChange={ handleChangeRadio }
          />
        </div>
        <div className="ingredient-container">
          <label htmlFor="first letter">First letter</label>
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="first"
            id="first-letter"
            checked={ options.radio === 'first' }
            onChange={ handleChangeRadio }
          />
        </div>
      </div>
      <button
        className="button"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          if (options.radio === 'first' && options.text.length !== 1) {
            global.alert('Your search must have only 1 (one) character');
            return;
          }
          fetchMealApi(options.radio, options.text, location.pathname);
        } }
      >
        Search
      </button>
    </div>
  );
}
