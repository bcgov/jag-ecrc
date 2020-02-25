/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  textInput: { label, id, note, textInputStyle, value, isRequired, errorMsg },
  onChange
}) => {
  let asterisk = "";
  if (isRequired) {
    asterisk = (
      <span id="asterisk" className="mandatory">
        *
      </span>
    );
  }

  const labelPart = (
    <div className="label">
      <label
        className={`textinput_label ${errorMsg ? "error" : ""}`}
        htmlFor={id}
      >
        {label}
      </label>
      {asterisk}&nbsp;
      <span className="note">{note}</span>
    </div>
  );

  let textStyle = "textinput_editable_white";
  const validStyles = [
    "textinput_editable_gray",
    "textinput_non_editable_gray",
    "textinput_editable_white"
  ];

  if (validStyles.includes(textInputStyle)) {
    textStyle = textInputStyle;
  }

  if (textStyle === "textinput_non_editable_gray")
    return (
      <div>
        {labelPart}
        <input
          className={`${textStyle}`}
          type="text"
          id={id}
          defaultValue={value}
          readOnly
          onChange={onChange}
        />
        <span className="error">{errorMsg}</span>
      </div>
    );

  return (
    <div>
      {labelPart}
      <input
        className={`${textStyle}`}
        type="text"
        id={id}
        defaultValue={value}
        onChange={event => onChange(event.target.value)}
      />
      <span className="error">{errorMsg}</span>
    </div>
  );
};

TextInput.propTypes = {
  textInput: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    note: PropTypes.string,
    textInputStyle: PropTypes.string,
    value: PropTypes.string,
    isRequired: PropTypes.bool,
    errorMsg: PropTypes.string
  }),
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  textInput: {
    note: "",
    errorMsg: ""
  },
  onChange: () => {}
};

export default TextInput;
