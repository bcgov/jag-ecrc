/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  textInput: {
    label,
    id,
    note,
    textInputStyle,
    value,
    placeholder,
    options,
    isRequired,
    errorMsg
  },
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

  if (options) {
    return (
      <div>
        {labelPart}
        <select className={textStyle} id={id} value={value} onChange={onChange}>
          {options.map(item => {
            return (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  return (
    <div>
      {labelPart}
      <input
        className={`${textStyle}`}
        type="text"
        id={id}
        defaultValue={value}
        placeholder={placeholder}
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
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ),
    isRequired: PropTypes.bool,
    errorMsg: PropTypes.string
  }),
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  textInput: {
    placeholder: "",
    note: "",
    errorMsg: ""
  },
  onChange: () => {}
};

export default TextInput;
