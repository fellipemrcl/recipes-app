import PropTypes from 'prop-types';
import React from 'react';

function Button({
  type = 'button',
  text = '',
  onClick = () => {},
  id = '',
  name,
  disabled = false,
}) {
  return (
    <button
      type={ type }
      data-testid={ id }
      onClick={ onClick }
      id={ id }
      name={ name }
      disabled={ disabled }
    >
      {text}

    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,

};

export default Button;
