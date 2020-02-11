import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({ textInput: { placeHolder } }) => {
  return <input type="text" name={placeHolder} />;
};

TextInput.propTypes = {
  textInput: PropTypes.shape({
    placeHolder: PropTypes.string.isRequired
  }).isRequired
};

export default TextInput;
