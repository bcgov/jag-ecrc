import React from "react";
import PropTypes from "prop-types";
import "./Form.css";
import { TextInput } from "../../base/textInput/TextInput";

export const Form = ({ textInputs }) => {
  const inputList = textInputs.map(input => {
    return (
      <li>
        <div>
          <TextInput key={input.name} textInput={input} />
        </div>
      </li>
    );
  });

  return (
    <form className="ecrcForm">
      {inputList.length > 0 && (
        <div className="row">
          <ul>{inputList}</ul>
        </div>
      )}
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
