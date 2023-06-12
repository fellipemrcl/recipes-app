import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom';
import recipeContext from '../context/Context';
import SearchBar from '../components/SearchBar';

// const searchInput = 'search-input';
// const firstLetterRadio = 'first-letter-search-radio';
// const execSearchButton = 'exec-search-btn';

const mockContext = {
  fetchMealApi: jest.fn(),
};

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve chamar a função fetchMealApi com a opção "ingredient" e o texto de busca correto quando o botão de busca for clicado', () => {
    render(
      <recipeContext.Provider value={ mockContext }>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </recipeContext.Provider>,
    );

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const execSearchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    fireEvent.click(ingredientRadio);

    fireEvent.click(execSearchButton);

    expect(mockContext.fetchMealApi).toHaveBeenCalledWith('ingredient', 'chicken', expect.anything());
  });

  test('deve exibir um alerta se a opção "first" for selecionada e o texto tiver mais de 1 caractere', () => {
    render(
      <recipeContext.Provider value={ mockContext }>
        <MemoryRouter>
          <SearchBar />
        </MemoryRouter>
      </recipeContext.Provider>,
    );

    window.alert = jest.fn();

    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchButton = screen.getByTestId('exec-search-btn');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(firstLetterRadio);

    fireEvent.click(execSearchButton);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    expect(mockContext.fetchMealApi).not.toHaveBeenCalled();
  });
});
