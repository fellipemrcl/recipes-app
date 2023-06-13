import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import renderWithRouter2 from './helpers/renderWithRouter2';
import App from '../App';

describe('Testa a tela de login', () => {
  const testEmail = 'tryber@teste.com';
  const testPassword = '12345678';
  const email = 'email-input';
  const password = 'password-input';
  test('1. Testa se renderiza os inputs corretamente', () => {
    renderWithRouter2(
      <Provider>
        <App />
      </Provider>,
    );
    screen.getByRole('button', { name: /Enter/i });
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
  });
  test('2. Testa se dá para modificar os valores do input', () => {
    renderWithRouter2(

      <Provider>
        <App />
      </Provider>,
    );

    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);

    act(() => {
      userEvent.type(inputEmail, testEmail);
      userEvent.type(inputPassword, testPassword);
    });

    expect(inputEmail).toHaveValue(testEmail);
    expect(inputPassword).toHaveValue(testPassword);
  });
  test('3. Testa se ao clicar no botão redireciona para a página "/meals"', async () => {
    const { history } = renderWithRouter2(

      <Provider>
        <App />
      </Provider>,
    );

    expect(history.location.pathname).toBe('/');

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, testPassword);
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
