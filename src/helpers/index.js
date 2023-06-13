import copy from 'clipboard-copy';

export const handleCopy = (setCopyMessage) => {
  const recipeLink = window.location.href;
  copy(recipeLink);
  setCopyMessage('Link copiado!');
};
