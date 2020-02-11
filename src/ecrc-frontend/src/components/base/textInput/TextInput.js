import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({ textInput: {} }) => {
  return <input type="text" className={`${buttonStyle} ${buttonSize}`}></input>;
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
