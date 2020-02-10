import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const BUTTON_STYLES = ["btn--primary--solid", "btn--warning--solid"];

const BUTTON_SIZES = ["btn--medium", "btn--small"];

export const Button = ({
  button: { children, onClick, buttonStyle, buttonSize }
}) => {
  const checkButtonStyle = BUTTON_STYLES.includes(buttonStyle)
    ? buttonStyle
    : BUTTON_STYLES[0];

  const checkButtonSize = BUTTON_SIZES.includes(buttonSize)
    ? buttonSize
    : BUTTON_SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  button: PropTypes.shape({
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonStyle: PropTypes.string,
    buttonSize: PropTypes.string
  })
};

Button.defaultProps = {
  button: {
    buttonStyle: BUTTON_STYLES[0],
    buttonSize: BUTTON_SIZES[0]
  }
};

export default Button;
