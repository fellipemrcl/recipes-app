import React from 'react';
import PropTypes from 'prop-types';
import recipeContext from './Context';

function Provider({ children }) {
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
