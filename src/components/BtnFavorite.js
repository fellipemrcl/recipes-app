import { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function BtnFavorite({ id, type, nationality, category, alcoholicOrNot, name, image }) {
  const [isFavorite, setIsFavorite] = useState(false);
  function toggleFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const existingRecipeIndex = favoriteRecipes.findIndex((recipe) => recipe.id === id);
    const magic = -1;
    if (existingRecipeIndex !== magic) {
      favoriteRecipes.splice(existingRecipeIndex, 1);
      setIsFavorite(false);
    } else {
      favoriteRecipes.push({
        id,
        type,
        nationality,
        category,
        alcoholicOrNot,
        name,
        image,
      });
      setIsFavorite(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
  return (
    <button
      onClick={ toggleFavorite }
    >
      <img
        src={ isFavorite ? blackHeart : whiteHeart }
        alt="botão favoritar"
        data-testid="favorite-btn"
      />
    </button>
  );
}
BtnFavorite.propTypes = {
  id: PropTypes.element.isRequired,
  type: PropTypes.element.isRequired,
  nationality: PropTypes.element.isRequired,
  category: PropTypes.element.isRequired,
  alcoholicOrNot: PropTypes.element.isRequired,
  name: PropTypes.element.isRequired,
  image: PropTypes.element.isRequired,
};
export default BtnFavorite;
