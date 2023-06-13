import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../context/Provider';
import RecipeInProgress from '../pages/RecipeInProgress';

beforeEach(() => {
  render(
    <Provider>
      <Router history={ createMemoryHistory() }>
        <RecipeInProgress />
      </Router>
    </Provider>,
  );
});

describe('Recipe Progress page', () => {
  it('should properly show the recipe info', () => {
    screen.getByTestId('recipe-photo');
    screen.getByTestId('recipe-title');
    screen.getByTestId('recipe-category');
    screen.getByTestId('instructions');
  });
  it('should show a button to finish the recipe', () => {
    screen.getByTestId('finish-recipe-btn');
  });
});
