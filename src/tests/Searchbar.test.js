import React from 'react';
import { screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// import SearchBar from '../components/SearchBar';
import { createMemoryHistory } from 'history';
import Provider from '../context/Provider';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('SearchBar', () => {
  it('Ao clicar no ícone de search deve renderizar um input e três radio button', () => {
    const history = createMemoryHistory();
    renderWithRouter(
      <Provider>
        <Router history={ history }>
          <Header title="My Title" showSearchIcon showProfileIcon />
        </Router>
      </Provider>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    act(() => {
      userEvent.click(searchBtn);
    });
    screen.getByTestId('page-title');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('search-top-btn');
    const input = screen.getByTestId('search-input');
    const search = screen.getByTestId('exec-search-btn');
    // const inputRadio = screen.getByTestId('ingredient-search-radio');
    const inputRadio2 = screen.getByTestId('first-letter-search-radio');
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    act(() => {
    // userEvent.click(inputRadio);
    // userEvent.click(searchBtn);
      userEvent.click(searchButton);
      userEvent.type(input, 'aa');
      userEvent.click(inputRadio2);
      userEvent.click(search);
    });
    expect(window.alert).toHaveBeenCalled();
    // const alert = screen.getByText('Your search must have only 1 (one) character');
    // expect(alert).toBeInTheDocument();
  });
});
