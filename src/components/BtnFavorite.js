import { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function BtnFavorite({ id, data }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const existingRecipeIndex = favoriteRecipes.findIndex((recipe) => recipe.id === id);
    const magicNumber = -1;
    if (existingRecipeIndex !== magicNumber) {
      favoriteRecipes.splice(existingRecipeIndex, 1);
      setIsFavorite(false);
    } else {
      favoriteRecipes.push({ id, ...data });
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  return (
    <button
      onClick={ toggleFavorite }
      data-testid="favorite-btn"
    >
      <img src={ isFavorite ? blackHeart : whiteHeart } alt="botão favoritar" />

    </button>
  );
}

BtnFavorite.propTypes = {
  id: PropTypes.element.isRequired,
  data: PropTypes.element.isRequired,
};

export default BtnFavorite;
