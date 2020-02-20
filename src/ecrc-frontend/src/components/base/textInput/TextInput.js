import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  textInput: { label, id, note, textInputStyle, value, isRequired },
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
      <label className="textinput_label" htmlFor={id}>
        {label}
      </label>
      {asterisk}
      <span className="note">&nbsp;{note}</span>
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
    isRequired: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  note: "",
  onChange: () => {}
};

export default TextInput;
