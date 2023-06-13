import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../context/Provider';
import DoneRecipes from '../pages/DoneRecipes';

describe('Recipes', () => {
  it('should render a category and img', async () => {
    render(
      <Provider>
        <Router history={ createMemoryHistory() }>
          <DoneRecipes />
        </Router>
      </Provider>,
    );
    screen.getByRole('button', { name: /all/i });
    screen.getByRole('button', { name: /drinks/i });
    screen.getByRole('button', { name: /meals/i });
    await waitFor(() => screen.getByRole('img', { name: /https:\/\/www\.themealdb\.com\/images\/media\/meals\/ustsqw1468250014\.jpg/i }), { timeout: 2000 });
    expect(screen.getByRole('img', { name: /https:\/\/www\.themealdb\.com\/images\/media\/meals\/ustsqw1468250014\.jpg/i })).toBeInTheDocument();
    screen.getByRole('heading', { name: /italian - vegetarian/i });
  });
});
