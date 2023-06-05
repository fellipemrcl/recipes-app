import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a tela de login', () => {
/*   const testEmail = 'tryber@teste.com';
  const testPassword = '12345678'; */

  const email = 'email-input';
  const password = 'password-input';
  test('1. Testa se renderiza os inputs corretamente', () => {
    renderWithRouter(

      <App />,

    );

    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
});
