import React from "react";
import PropTypes from "prop-types";
import "./Form.css";
import { TextInput } from "../../base/textInput/TextInput";
import { Button } from "../../base/button/Button";

export const Form = ({ textInputs, buttons }) => {
  const inputList = textInputs.map(input => {
    return (
      <li>
        <TextInput key={input.name} textInput={input} />
      </li>
    );
  });

  const buttonList = buttons.map(button => {
    return (
      <li>
        <Button key={button.name} button={button} />
      </li>
    );
  });

  return (
    <form className="ecrcForm">
      {inputList.length > 0 && <ul>{inputList}</ul>}
      {buttonList.length > 0 && <ul id="buttonList">{buttonList}</ul>}
    </form>
  );
};

Form.propTypes = {
  textInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

Form.defaultProps = {
  textInputs: []
};

export default Form;
