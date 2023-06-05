import PropTypes from 'prop-types';
import React from 'react';

function Button({ testId, type, text, onClick, id, name }) {
  return (
    <button
      type={ type }
      data-testId={ testId }
      onClick={ onClick }
      id={ id }
      name={ name }
    >
      {text}

    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Button;
