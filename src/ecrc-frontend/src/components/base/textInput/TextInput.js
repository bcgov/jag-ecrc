import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  textInput: { label, id, textInputStyle, value }
}) => {
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
        <div>
          <label className="textinput_label" htmlFor={id}>
            {label}
          </label>
        </div>
        <input
          className={`${textStyle}`}
          type="text"
          id={id}
          value={value}
          readOnly
        />
      </div>
    );

  return (
    <div>
      <div>
        <label className="textinput_label" htmlFor={id}>
          {label}
        </label>
      </div>
      <input
        className={`${textStyle}`}
        type="text"
        id={id}
        defaultValue={value}
      />
    </div>
  );
};

TextInput.propTypes = {
  textInput: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    textInputStyle: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default TextInput;
