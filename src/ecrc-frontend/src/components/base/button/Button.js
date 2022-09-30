/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import Loader from "../loader/Loader";

export function Button({
  button: { label, buttonStyle, buttonSize, type, disabled, loader },
  onClick
}) {
  let buttonType = "button";
  let displayLoader = "loader-hide";
  const validTypes = ["button", "submit", "reset"];

  if (validTypes.includes(type)) {
    buttonType = type;
  }

  if (loader) {
    displayLoader = "loader-show";
  }

  return (
    <button
      className={`${buttonStyle} ${buttonSize}`}
      onClick={onClick}
      type={buttonType}
      disabled={disabled}
    >
      {label}
      <div className={displayLoader}>
        <Loader />
      </div>
    </button>
  );
}

Button.propTypes = {
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
    buttonSize: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loader: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
