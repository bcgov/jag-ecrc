/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({
  button: { label, buttonStyle, buttonSize, type, disabled },
  onClick
}) => {
  let buttonType = "button";
  const validTypes = ["button", "submit", "reset"];

  if (validTypes.includes(type)) {
    buttonType = type;
  }

  console.log(`disabled={disabled}`);
  return (
    <button
      className={`${buttonStyle} ${buttonSize}`}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  button: PropTypes.shape({
    disabled: false
  })
};

export default Button;
