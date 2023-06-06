import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';

describe('Header', () => {
  it('should render a title and two buttons', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Header title="My Title" showProfileIcon showSearchIcon />
      </Router>,
    );
    screen.getByTestId('page-title');
    screen.getByTestId('profile-top-btn');
    screen.getByTestId('search-top-btn');
  });

  it('should redirect to /profile when profile button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header title="My Title" showProfileIcon showSearchIcon />
      </Router>,
    );
    const profileButton = screen.getByTestId('profile-top-btn');
    act(() => {
      profileButton.click();
    });
    expect(history.location.pathname).toBe('/profile');
  });

  it('should show and hide an input when search button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header title="My Title" showProfileIcon showSearchIcon />
      </Router>,
    );
    const searchButton = screen.getByTestId('search-top-btn');
    act(() => {
      searchButton.click();
    });
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    act(() => {
      searchButton.click();
    });
    expect(searchInput).not.toBeInTheDocument();
  });
});
