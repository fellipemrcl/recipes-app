import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('Profile', () => {
  const emailTest = 'test@example.com';
  const profileTest = 'profile-email';

  beforeEach(() => {
    // Define um usuário fictício no localStorage antes de cada teste
    const user = { email: emailTest };
    localStorage.setItem('user', JSON.stringify(user));
  });

  afterEach(() => {
    // Limpa o localStorage após cada teste
    localStorage.clear();
  });

  test('Exibe o email do usuário quando há um usuário armazenado', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const emailElement = screen.getByTestId(profileTest);
    expect(emailElement.textContent).toBe(emailTest);
  });

  test('Exibe um texto vazio quando não há um usuário armazenado', () => {
    localStorage.clear(); // Remove o usuário armazenado para simular a ausência de um usuário

    render(
      <Router>
        <Profile />
      </Router>,
    );

    const emailElement = screen.getByTestId(profileTest);
    expect(emailElement.textContent).toBe('');
  });

  test('Exibe o email do usuário', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const emailElement = screen.getByTestId(profileTest);
    expect(emailElement.textContent).toBe(emailTest);
  });

  test('Redireciona para a página de "Done Recipes" ao clicar no botão "Done Recipes"', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const doneRecipesButton = screen.getByText('Done Recipes');
    fireEvent.click(doneRecipesButton);

    expect(historyMock.push).toHaveBeenCalledWith('/done-recipes');
  });

  test('Redireciona para a página de "Favorite Recipes" ao clicar no botão "Favorite Recipes"', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const favoriteRecipesButton = screen.getByText('Favorite Recipes');
    fireEvent.click(favoriteRecipesButton);

    expect(historyMock.push).toHaveBeenCalledWith('/favorite-recipes');
  });

  test('Limpa o localStorage e redireciona para a página inicial ao clicar no botão "Logout"', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledWith('/');
  });
});
