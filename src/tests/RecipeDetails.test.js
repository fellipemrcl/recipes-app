import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../context/Provider';
import RecipeDetails from '../pages/RecipeDetails';

beforeEach(() => {
  render(
    <Provider>
      <Router history={ createMemoryHistory() }>
        <RecipeDetails />
      </Router>
    </Provider>,
  );
});

describe('Recipe Details page', () => {
  it('should properly show the recipe info', () => {
    screen.getByTestId('recipe-photo');
    screen.getByTestId('recipe-title');
    screen.getByTestId('recipe-category');
    screen.getByTestId('instructions');
  });
  it('should show a button to start the recipe', () => {
    screen.getByTestId('start-recipe-btn');
  });
});
