import React from "react";
import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  textInput: { label, id, textInputStyle, value, isRequired }
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

  let redStar = "";
  if (isRequired === true) {
    redStar = <span className="musthave">*</span>;
  }

  if (textStyle === "textinput_non_editable_gray")
    return (
      <div>
        <div>
          <label className="textinput_label" htmlFor={id}>
            {label}
          </label>
          {redStar}
        </div>
        <input
          className={`${textStyle}`}
          type="text"
          id={id}
          defaultValue={value}
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
        {redStar}
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
    value: PropTypes.string,
    isRequired: PropTypes.bool
  }).isRequired
};

export default TextInput;
