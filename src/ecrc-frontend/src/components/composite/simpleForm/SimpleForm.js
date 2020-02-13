import React from "react";
import PropTypes from "prop-types";
import "./SimpleForm.css";
import { TextInput } from "../../base/textInput/TextInput";
import { Button } from "../../base/button/Button";

export const SimpleForm = ({ title, textInputs, buttons }) => {
  const inputList = textInputs.map(input => {
    return (
      <li key={input.id}>
        <TextInput textInput={input} onChange={input.onChange} />
      </li>
    );
  });

  const buttonList = buttons.map(button => {
    return (
      <li key={button.label}>
        <Button
          button={{
            label: button.label,
            buttonStyle: button.buttonStyle,
            buttonSize: button.buttonSize,
            type: button.type
          }}
          onClick={button.onClick}
        />
      </li>
    );
  });

  return (
    <form className="simpleForm">
      {title != null && <div className="simpleForm_title">{title}</div>}
      {inputList.length > 0 && <ul>{inputList}</ul>}
      {buttonList.length > 0 && <ul id="buttonList">{buttonList}</ul>}
    </form>
  );
};

SimpleForm.propTypes = {
  title: PropTypes.string,
  textInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      textInputStyle: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
      isRequired: PropTypes.bool
    })
  ),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      buttonStyle: PropTypes.string.isRequired,
      buttonSize: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      onClick: PropTypes.func
    })
  )
};

SimpleForm.defaultProps = {
  title: null,
  textInputs: [],
  buttons: []
};

export default SimpleForm;
