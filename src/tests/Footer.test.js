import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('should render the footer component', () => {
    render(
      <Router history={ createMemoryHistory() }>
        <Footer />
      </Router>,
    );

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('should navigate to /drinks when drinks button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    drinksButton.click();

    expect(history.location.pathname).toBe('/drinks');
  });

  it('should navigate to /meals when meals button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    mealsButton.click();

    expect(history.location.pathname).toBe('/meals');
  });

  it('should not render the footer in an unlisted route', () => {
    const history = createMemoryHistory();
    history.push('/unlisted-route');
    render(
      <Router history={ history }>
        <Footer />
      </Router>,
    );

    const footerElement = screen.queryByTestId('footer');
    expect(footerElement).toBeNull();
  });
});
