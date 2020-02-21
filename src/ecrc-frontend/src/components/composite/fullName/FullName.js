import React from "react";
import PropTypes from "prop-types";

import { SimpleForm } from "../simpleForm/SimpleForm";

export default function FullName({
  title,
  fullname: { firstName, middleName, lastName }
}) {
  const name = {
    title,
    textInputs: [firstName, middleName, lastName],
    buttons: []
  };

  return <SimpleForm simpleForm={name} />;
}

FullName.propTypes = {
  title: PropTypes.string,
  fullname: PropTypes.shape({
    firstName: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    }),
    middleName: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    }),
    lastName: PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string,
      textInputStyle: PropTypes.string
    })
  })
};

FullName.defaultProps = {
  title: "",
  fullname: {
    firstName: {
      value: "",
      textInputStyle: ""
    },
    middleName: {
      value: "",
      textInputStyle: ""
    },
    lastName: {
      value: "",
      textInputStyle: ""
    }
  }
};
