/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import Input from "react-phone-number-input/input";
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
    phone = false,
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

  let labelPart = null;
  if (label) {
    labelPart = (
      <label htmlFor={id} className="label">
        <div className="textinput_label">{label}</div>
        {asterisk}&nbsp;
        <span className="note">{note}</span>
      </label>
    );
  }

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
        {labelPart && labelPart}
        <input
          className={`${textStyle}`}
          type="text"
          id={id}
          defaultValue={value}
          readOnly
          onChange={onChange}
        />
        <br />
        <span className="error">{errorMsg}</span>
      </div>
    );

  if (options) {
    return (
      <div>
        {labelPart && labelPart}
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

  if (phone) {
    return (
      <div>
        {labelPart && labelPart}
        <Input
          country={"CA"}
          className={textStyle}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <br />
        <span className="error">{errorMsg}</span>
      </div>
    );
  }

  return (
    <div>
      {labelPart && labelPart}
      <input
        className={`${textStyle}`}
        type="text"
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
      />
      <br />
      <span className="error">{errorMsg}</span>
    </div>
  );
};

TextInput.propTypes = {
  textInput: PropTypes.shape({
    label: PropTypes.string,
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
