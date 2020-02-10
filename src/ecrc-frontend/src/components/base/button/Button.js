import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const BUTTON_STYLES = ["btn--primary--solid", "btn--warning--solid"];

const BUTTON_SIZES = ["btn--medium", "btn--small"];

export const Button = ({
  button: { children, onClick, type, buttonStyle, buttonSize }
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
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  button: PropTypes.shape({
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired
};

// Button.defaultProps = {
//   children: "",
//   buttonStyle: BUTTON_STYLES[0],
//   buttonSize: BUTTON_SIZES[0],
//   onClick: console.log("button clicked."),
//   type: "button"
// };

export default Button;
