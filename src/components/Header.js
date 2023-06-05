import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, showProfileIcon, showSearchIcon }) {
  return (
    <header>
      <h1 data-testId="page-title">{title}</h1>
      {showProfileIcon && (
        <button>
          <img src={ profileIcon } alt="" data-testId="profile-top-btn" />
        </button>
      )}
      {showSearchIcon && (
        <button>
          <img src={ searchIcon } alt="" data-testId="search-top-btn" />
        </button>)}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.bool.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
