import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Recipes from '../pages/Recipes';
import Provider from '../context/Provider';

describe('Recipes', () => {
  it('should render a category and img', async () => {
    render(
      <Provider>
        <Router history={ createMemoryHistory() }>
          <Recipes />
        </Router>
      </Provider>,
    );
    await waitFor(() => screen.getByRole('button', { name: /ordinary drink/i }), { timeout: 4000 });
    screen.getByRole('button', { name: /all/i });
    expect(screen.getByRole('button', { name: /ordinary drink/i })).toBeInTheDocument();
    await waitFor(() => screen.getByRole('img', { name: /15997/i }), { timeout: 2000 });
    expect(screen.getByRole('img', { name: /15997/i })).toBeInTheDocument();
    const ordinary = screen.getByRole('button', { name: /ordinary drink/i });
    act(() => {
      ordinary.click();
    });
    await waitFor(() => screen.getByRole('heading', { name: /3-mile long island iced tea/i }), { timeout: 2000 });
    screen.getByRole('heading', { name: /3-mile long island iced tea/i });
  });
});
