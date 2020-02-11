/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({
  button: { label, onClick, buttonStyle, buttonSize, type }
}) => {
  let buttonType = "button";
  const validTypes = ["button", "submit", "reset"];

  if (validTypes.includes(type)) {
    buttonType = type;
  }

  return (
    <button
      className={`${buttonStyle} ${buttonSize}`}
      onClick={onClick}
      type={buttonType}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired
};

export default Button;
