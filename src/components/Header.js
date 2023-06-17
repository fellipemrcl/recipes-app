import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import '../styles/Header.css';

function Header({ title, showProfileIcon, showSearchIcon }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <section className="header-container">
        <h1 data-testid="page-title">{title}</h1>
        <div className="header-buttons-container">
          {showProfileIcon && (
            <button onClick={ () => history.push('/profile') }>
              <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
            </button>
          )}
          {showSearchIcon && (
            <button onClick={ () => setShowSearchBar(!showSearchBar) }>
              <img src={ searchIcon } alt="" data-testid="search-top-btn" />
            </button>
          )}
        </div>
      </section>
      {showSearchBar && (
        <div>
          {/* <input type="text" data-testid="search-input" /> */}
          <SearchBar />
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.bool.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
