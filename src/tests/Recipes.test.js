import React from 'react';
import { render, screen } from '@testing-library/react';
import Recipes from '../pages/Recipes';

test('Recipes teste', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<Recipes />);
  const beef = screen.getByRole('button', {
    name: /beef/i,
  });
  const breakfast = screen.getByRole('button', {
    name: /breakfast/i,
  });
  const chicken = screen.getByRole('button', {
    name: /chicken/i,
  });
  const dessert = screen.getByRole('button', {
    name: /dessert/i,
  });
  const goat = screen.getByRole('button', {
    name: /dessert/i,
  });
  expect(beef).toBeInTheDocument();
  expect(breakfast).toBeInTheDocument();
  expect(chicken).toBeInTheDocument();
  expect(dessert).toBeInTheDocument();
  expect(goat).toBeInTheDocument();
});
